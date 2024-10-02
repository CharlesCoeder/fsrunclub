export interface Reward {
  id: string;
  name: string;
  description: string;
  requiredRuns: number;
  image?: string;
}

export interface UserReward {
  userId: string;
  rewardId: string;
  dateEarned: string;
}