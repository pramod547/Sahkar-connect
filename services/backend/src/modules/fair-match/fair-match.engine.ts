import {
  CandidateWorker,
  FairMatchWeights,
  LocationPoint,
  RankedCandidate,
  ScoreBreakdown,
} from '@sahakar/shared-types';

export const DEFAULT_FAIR_MATCH_WEIGHTS: FairMatchWeights = {
  W_prox: 0.30,
  W_rating: 0.20,
  W_fair: 0.35,
  W_skill: 0.15,
};

/**
 * Calculates Haversine distance in kilometers between two lat/lng coordinates.
 */
export function calculateDistanceKm(pointA: LocationPoint, pointB: LocationPoint): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((pointB.latitude - pointA.latitude) * Math.PI) / 180;
  const dLon = ((pointB.longitude - pointA.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pointA.latitude * Math.PI) / 180) *
      Math.cos((pointB.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateProximityScore(
  workerLocation: LocationPoint,
  jobLocation: LocationPoint,
  maxRadiusKm: number = 8.0
): number {
  const distance = calculateDistanceKm(workerLocation, jobLocation);
  if (distance >= maxRadiusKm) return 0;
  const rawScore = 1 - distance / maxRadiusKm;
  return Math.max(0, Math.min(1, rawScore));
}

export function calculateRatingScore(
  rollingAvgRating: number | null,
  completedJobsCount: number,
  societyAvgRating: number = 4.5
): number {
  // COOP_BUSINESS_LOGIC.md §1.2 & §3:
  // Rating score takes effect only after ≥5 completed jobs. Below that, use society average prior.
  if (completedJobsCount < 5 || rollingAvgRating === null) {
    return Math.max(0, Math.min(1, societyAvgRating / 5.0));
  }
  return Math.max(0, Math.min(1, rollingAvgRating / 5.0));
}

export function calculateRotationFairnessScore(
  jobsThisWeek: number,
  societyMedianJobsThisWeek: number
): number {
  // COOP_BUSINESS_LOGIC.md §1.2:
  // clamp(1 - (jobs_this_week / (society_median_jobs_this_week + 1)), 0, 1)
  const rawScore = 1 - jobsThisWeek / (societyMedianJobsThisWeek + 1);
  return Math.max(0, Math.min(1, rawScore));
}

export function calculateSkillMatchScore(hasExactSkill: boolean): number {
  return hasExactSkill ? 1.0 : 0.6;
}

/**
 * Pure function: ranks candidates based on proximity, rating, rotation-fairness, and skill match.
 * Isolated from DB/network for deterministic unit testing.
 */
export function rankCandidates(
  jobLocation: LocationPoint,
  candidatePool: CandidateWorker[],
  maxRadiusKm: number = 8.0,
  societyAvgRating: number = 4.5,
  weights: FairMatchWeights = DEFAULT_FAIR_MATCH_WEIGHTS,
  isFederationOverflow: boolean = false
): RankedCandidate[] {
  if (candidatePool.length === 0) return [];

  // Compute society median jobs this week across candidate pool
  const sortedWeeklyJobs = candidatePool.map((c) => c.jobs_this_week_count).sort((a, b) => a - b);
  const mid = Math.floor(sortedWeeklyJobs.length / 2);
  const societyMedianJobs =
    sortedWeeklyJobs.length % 2 !== 0
      ? sortedWeeklyJobs[mid]
      : (sortedWeeklyJobs[mid - 1] + sortedWeeklyJobs[mid]) / 2;

  const ranked: RankedCandidate[] = candidatePool.map((worker) => {
    const proximity = calculateProximityScore(worker.current_location, jobLocation, maxRadiusKm);
    const rating = calculateRatingScore(worker.rolling_avg_rating, worker.completed_jobs_count, societyAvgRating);
    const fairness = calculateRotationFairnessScore(worker.jobs_this_week_count, societyMedianJobs);
    const skill = calculateSkillMatchScore(worker.has_exact_skill);

    let finalScore =
      weights.W_prox * proximity +
      weights.W_rating * rating +
      weights.W_fair * fairness +
      weights.W_skill * skill;

    // COOP_BUSINESS_LOGIC.md §1.4: Overflow penalty if from a sibling society
    if (isFederationOverflow) {
      finalScore -= 0.05;
    }

    const breakdown: ScoreBreakdown = {
      proximity: Number(proximity.toFixed(4)),
      rating: Number(rating.toFixed(4)),
      fairness: Number(fairness.toFixed(4)),
      skill: Number(skill.toFixed(4)),
    };

    return {
      worker,
      final_score: Number(Math.max(0, finalScore).toFixed(4)),
      score_breakdown: breakdown,
    };
  });

  // Sort descending by final_score
  return ranked.sort((a, b) => b.final_score - a.final_score);
}
