import { RootState } from "../../store";

export const splashStateSelector = (state: RootState) =>
  state.splashSection.splashState;
export const visitStateSelector = (state: RootState) =>
  state.splashSection.isFirstVisit;

export const selectCurrentSlide = (state: RootState) =>
  state.splashSection.onBoarding.currentSlide;
export const selectAcceptedTerms = (state: RootState) =>
  state.splashSection.onBoarding.acceptedTerms;
export const selectIsOnboardingCompleted = (state: RootState) =>
  state.splashSection.onBoarding.isCompleted;
export const selectOnboardingState = (state: RootState) =>
  state.splashSection.onBoarding;
