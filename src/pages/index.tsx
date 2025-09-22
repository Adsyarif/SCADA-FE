import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setVisit,
  visitStateSelector,
  setSplashStateState,
  splashStateSelector,
} from "@/store";
import { SplashScreen, OnboardingCarousel } from "@/components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const InitialPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentSplashState = useAppSelector(splashStateSelector);
  const isVisit = useAppSelector(visitStateSelector);

  const { data: session } = useSession();

  const userName = session?.user.name;
  console.log("username", userName);

  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");
    dispatch(setVisit(!visited));
  }, []);

  const handleSplashFinish = () => {
    if (isVisit) {
      dispatch(setSplashStateState("onboarding"));
    } else if (userName) {
      router.push("/dashboard");
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
};

export default InitialPage;
