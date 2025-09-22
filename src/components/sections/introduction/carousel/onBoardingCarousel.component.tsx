import {
  nextSlide,
  prevSlide,
  setCurrentSlide,
  setAcceptedTerms,
  completeOnboarding,
} from "@/store";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import {
  HouseIcon,
  Mail,
  Bell,
  User,
  SquareArrowRightIcon,
} from "lucide-react";

interface OnboardingCarouselProps {
  onComplete?: () => void;
}

const slides = [
  {
    title: "Selamat Datang di SCADA ONLINE",
    content:
      "Sistem monitoring terintegrasi untuk memantau perangkat Anda secara real-time.",
    icon: <HouseIcon className="w-16 h-16 text-blue-500" />,
  },
  {
    title: "Pantau Perangkat",
    content: "Lihat status semua perangkat SCADA Anda dalam satu dashboard.",
    icon: <Mail className="w-16 h-16 text-blue-500" />,
  },
  {
    title: "Notifikasi Real-time",
    content:
      "Dapatkan notifikasi instan ketika ada masalah dengan perangkat Anda.",
    icon: <Bell className="w-16 h-16 text-blue-500" />,
  },
  {
    title: "Kelola Akun",
    content: "Atur profil dan preferensi Anda dengan mudah.",
    icon: <User className="w-16 h-16 text-blue-500" />,
  },
  {
    title: "Siap Memulai?",
    content: "Setujui syarat dan ketentuan untuk mulai menggunakan aplikasi.",
    icon: <SquareArrowRightIcon className="w-16 h-16 text-blue-500" />,
  },
];

const OnboardingCarousel = ({ onComplete }: OnboardingCarouselProps) => {
  const dispatch = useAppDispatch();
  const { currentSlide, acceptedTerms, isCompleted } = useAppSelector(
    (state: RootState) => state.splashSection.onBoarding
  );

  const handleNextSlide = () => {
    dispatch(nextSlide());
  };

  const handlePrevSlide = () => {
    dispatch(prevSlide());
  };

  const handleSetCurrentSlide = (index: number) => {
    dispatch(setCurrentSlide(index));
  };

  const handleAcceptTerms = (checked: boolean) => {
    dispatch(setAcceptedTerms(checked));
  };

  const handleConfirm = () => {
    if (acceptedTerms) {
      dispatch(completeOnboarding());
      if (onComplete) {
        onComplete();
      }
    }
  };

  if (isCompleted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[520px] flex flex-col bg-white rounded-xl shadow-lg p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center mb-4">
          <div className="mb-6 h-20 flex items-center justify-center">
            {slides[currentSlide].icon}
          </div>

          <div className="h-38 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight line-clamp-2">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed px-2">
              {slides[currentSlide].content}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-6 h-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSetCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {currentSlide === slides.length - 1 && (
          <div className="mb-6 h-12 flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => handleAcceptTerms(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
              />
              <span className="ml-3 text-gray-700 text-sm md:text-base">
                Saya menyetujui syarat dan ketentuan
              </span>
            </label>
          </div>
        )}

        <div className="flex justify-between items-center h-12">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[80px] ${
              currentSlide === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Kembali
          </button>

          {currentSlide < slides.length - 1 ? (
            <button
              onClick={handleNextSlide}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors min-w-[80px]"
            >
              Lanjut
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={!acceptedTerms}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[80px] ${
                acceptedTerms
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Konfirmasi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
