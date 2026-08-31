import { describe, it, expect } from 'vitest';
import {
  calculateProximityScore,
  calculateRatingScore,
  calculateRotationFairnessScore,
  calculateSkillMatchScore,
  rankCandidates,
} from '../src/modules/fair-match/fair-match.engine';
import { CandidateWorker } from '@sahakar/shared-types';

describe('Fair-Match Engine Pure Logic', () => {
  const jobLocation = { latitude: 19.0760, longitude: 72.8777 }; // Bandra West, Mumbai

  it('calculates proximity score accurately within radius and 0 outside radius', () => {
    // 0km distance
    const exactLoc = { latitude: 19.0760, longitude: 72.8777 };
    expect(calculateProximityScore(exactLoc, jobLocation, 8.0)).toBe(1.0);

    // Far location (>8km)
    const farLoc = { latitude: 19.3000, longitude: 73.0000 };
    expect(calculateProximityScore(farLoc, jobLocation, 8.0)).toBe(0);
  });

  it('applies neutral rating prior for probation / new workers with <5 completed jobs', () => {
    // Worker with 2 jobs and a 5.0 rating should still use neutral prior (4.5 / 5.0 = 0.9)
    const newWorkerRatingScore = calculateRatingScore(5.0, 2, 4.5);
    expect(newWorkerRatingScore).toBe(0.9);

    // Worker with 10 jobs and 4.8 rating uses actual average (4.8 / 5.0 = 0.96)
    const experiencedWorkerScore = calculateRatingScore(4.8, 10, 4.5);
    expect(experiencedWorkerScore).toBe(0.96);
  });

  it('prioritizes rotation fairness (lower jobs this week scores higher)', () => {
    const workerUnderMedian = calculateRotationFairnessScore(0, 3); // 1 - (0 / 4) = 1.0
    const workerOverMedian = calculateRotationFairnessScore(5, 3);  // 1 - (5 / 4) = clamp(-0.25) = 0.0

    expect(workerUnderMedian).toBe(1.0);
    expect(workerOverMedian).toBe(0.0);
  });

  it('ranks worker with fewer jobs higher when proximity and skill are comparable (rotation fairness test)', () => {
    const workerA: CandidateWorker = {
      worker_id: 'w1',
      user_id: 'u1',
      society_id: 's1',
      full_name: 'Worker A (Busy)',
      current_location: { latitude: 19.0770, longitude: 72.8780 },
      rolling_avg_rating: 4.9,
      completed_jobs_count: 50,
      jobs_this_week_count: 6, // High job volume
      is_probation: false,
      has_exact_skill: true,
    };

    const workerB: CandidateWorker = {
      worker_id: 'w2',
      user_id: 'u2',
      society_id: 's1',
      full_name: 'Worker B (Starved)',
      current_location: { latitude: 19.0770, longitude: 72.8780 },
      rolling_avg_rating: 4.7,
      completed_jobs_count: 15,
      jobs_this_week_count: 0, // Zero jobs this week!
      is_probation: false,
      has_exact_skill: true,
    };

    const ranked = rankCandidates(jobLocation, [workerA, workerB]);

    // Worker B must win due to W_fair = 0.35 rotation fairness weight
    expect(ranked[0].worker.worker_id).toBe('w2');
    expect(ranked[0].final_score).toBeGreaterThan(ranked[1].final_score);
  });

  it('applies federation overflow penalty correctly when specified', () => {
    const worker: CandidateWorker = {
      worker_id: 'w1',
      user_id: 'u1',
      society_id: 's1',
      full_name: 'Worker Overflow',
      current_location: jobLocation,
      rolling_avg_rating: 4.5,
      completed_jobs_count: 10,
      jobs_this_week_count: 2,
      is_probation: false,
      has_exact_skill: true,
    };

    const normalRanked = rankCandidates(jobLocation, [worker], 8.0, 4.5, undefined, false);
    const overflowRanked = rankCandidates(jobLocation, [worker], 8.0, 4.5, undefined, true);

    expect(overflowRanked[0].final_score).toBeCloseTo(normalRanked[0].final_score - 0.05, 4);
  });

  it('returns empty array when candidate pool is empty', () => {
    const ranked = rankCandidates(jobLocation, []);
    expect(ranked).toEqual([]);
  });
});
