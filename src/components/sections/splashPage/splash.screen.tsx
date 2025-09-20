import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

const SplashScreen = ({ onFinish, duration = 2500 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-blue-600 z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center text-white">
        <div className="w-24 h-24 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
          <img src="/img/Logo.png" alt="logo" className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold mb-2">SCADA ONLINE</h1>
        <p className="text-xl opacity-80">Monitoring System</p>
        <div className="mt-8 w-32 h-1 bg-white bg-opacity-30 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-2000 ease-out"
            style={{ width: isVisible ? "100%" : "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
