export interface JoinCommunityData {
  name: string;
  email: string;
  phoneNumber: string;
  cityOrState: string;
  occupation: string;
  dealDiscoverySource: string;
  hasModerationExperience: boolean;
  hasUsedDealWebsites: boolean;
  howDidYouHearAboutUs: string;
  recentDeal?: string;
}