import { z } from 'zod';

export interface LocationPoint {
  latitude: number;
  longitude: number;
}

export interface CandidateWorker {
  worker_id: string;
  user_id: string;
  society_id: string;
  full_name: string;
  current_location: LocationPoint;
  rolling_avg_rating: number | null;
  completed_jobs_count: number;
  jobs_this_week_count: number;
  is_probation: boolean;
  has_exact_skill: boolean;
}

export interface FairMatchWeights {
  W_prox: number;   // default 0.30
  W_rating: number; // default 0.20
  W_fair: number;   // default 0.35
  W_skill: number;  // default 0.15
}

export interface ScoreBreakdown {
  proximity: number;
  rating: number;
  fairness: number;
  skill: number;
}

export interface RankedCandidate {
  worker: CandidateWorker;
  final_score: number;
  score_breakdown: ScoreBreakdown;
}

export const FairMatchWeightsSchema = z.object({
  W_prox: z.number().default(0.30),
  W_rating: z.number().default(0.20),
  W_fair: z.number().default(0.35),
  W_skill: z.number().default(0.15),
});
