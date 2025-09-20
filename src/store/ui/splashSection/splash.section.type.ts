export type SplashState = "splash" | "onboarding" | "login" | "main";

export interface IOnBoardingState {
  currentSlide: number;
  acceptedTerms: boolean;
  isCompleted: boolean;
}
