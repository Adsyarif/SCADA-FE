import { useEffect } from "react";
import { useRouter } from "next/router";
import SplashScreen from "@/components/sections/splashPage/splash.screen";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setVisit,
  visitStateSelector,
  setSplashStateState,
  splashStateSelector,
} from "@/store";
import OnboardingCarousel from "@/components/carousel/carousel.onboarding";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentSplashState = useAppSelector(splashStateSelector);
  const isVisit = useAppSelector(visitStateSelector);
  console.log("splashState", currentSplashState);

  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");
    dispatch(setVisit(!visited));
  }, []);

  const handleSplashFinish = () => {
    if (isVisit) {
      dispatch(setSplashStateState("onboarding"));
    } else {
      router.push("/login");
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasVisited", "true");
    dispatch(setSplashStateState("login"));
    router.push("/login");
  };

  return (
    <>
      {currentSplashState === "splash" && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {currentSplashState === "onboarding" && (
        <OnboardingCarousel onComplete={handleOnboardingComplete} />
      )}
    </>
  );
}
