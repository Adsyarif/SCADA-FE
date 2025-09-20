import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { IOnBoardingState, SplashState } from "./splash.section.type";

interface ISplash {
  splashState: SplashState;
  isFirstVisit: boolean;
  onBoarding: IOnBoardingState;
}

const INITIAL_STATE: ISplash = {
  splashState: "splash",
  isFirstVisit: true,
  onBoarding: {
    currentSlide: 0,
    acceptedTerms: false,
    isCompleted: false,
  },
};

export const splashSlicer = createSlice({
  name: "splashSection",
  initialState: INITIAL_STATE,
  reducers: {
    setSplashStateState: (state, action: PayloadAction<SplashState>) => {
      state.splashState = action.payload;
    },
    setVisit: (state, action: PayloadAction<boolean>) => {
      state.isFirstVisit = action.payload;
    },
    setCurrentSlide: (state, action: PayloadAction<number>) => {
      state.onBoarding.currentSlide = action.payload;
    },
    nextSlide: (state) => {
      if (state.onBoarding.currentSlide < 4) {
        state.onBoarding.currentSlide += 1;
      }
    },
    prevSlide: (state) => {
      if (state.onBoarding.currentSlide > 0) {
        state.onBoarding.currentSlide -= 1;
      }
    },
    setAcceptedTerms: (state, action: PayloadAction<boolean>) => {
      state.onBoarding.acceptedTerms = action.payload;
    },
    completeOnboarding: (state) => {
      state.onBoarding.isCompleted = true;
    },
    resetOnboarding: (state) => {
      state.onBoarding.currentSlide = 0;
      state.onBoarding.acceptedTerms = false;
      state.onBoarding.isCompleted = false;
    },
  },
});

export const {
  setSplashStateState,
  setVisit,
  setCurrentSlide,
  nextSlide,
  prevSlide,
  setAcceptedTerms,
  completeOnboarding,
  resetOnboarding,
} = splashSlicer.actions;
export const splashSectionReducer = splashSlicer.reducer;
