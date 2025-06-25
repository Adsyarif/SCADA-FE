import { useState } from "react";

const RevisionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [revisionText, setRevisionText] = useState("");

  const handleRevisionClick = () => {
    setIsVisible(true);
    setButtonsDisabled(true);
  };

  const handleCancelClick = () => {
    setIsVisible(false);
    setButtonsDisabled(false);
    setRevisionText("");
  };

  return (
    <>
      <div className="flex justify-center space-x-6 mb-5">
        <button
          disabled={buttonsDisabled}
          className={`text-sm w-[100px] h-[40px] text-center rounded-md transition-all duration-200 ${
            buttonsDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-violet-500 text-white hover:bg-violet-800"
          }`}
        >
          Terima
        </button>

        <button
          onClick={handleRevisionClick}
          disabled={buttonsDisabled}
          className={`text-sm w-[100px] h-[40px] text-center rounded-md border-2 transition-all duration-200 ${
            buttonsDisabled
              ? "bg-white text-gray-500 border-gray-300 cursor-not-allowed"
              : "bg-white text-gray-900 border-gray-600 hover:bg-violet-800 hover:text-white"
          }`}
        >
          Butuh Revisi
        </button>
      </div>

      {isVisible && (
        <div>
          <div className="mb-5">
            <textarea
              value={revisionText}
              onChange={(e) => setRevisionText(e.target.value)}
              className="rounded-md p-2 w-full border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Tulis revisi di sini..."
              rows={5}
            />
          </div>

          <div className="flex justify-center space-x-6 mb-5">
            <button
              className="bg-violet-500 text-sm text-white w-[100px] h-[40px] text-center rounded-md hover:bg-violet-800 transition-all duration-200"
              onClick={() => {
                console.log("Revisi dikirim:", revisionText);
                setIsVisible(false);
                setButtonsDisabled(false);
                setRevisionText("");
              }}
            >
              Kirim
            </button>

            <button
              onClick={handleCancelClick}
              className="bg-white text-sm text-gray-900 w-[100px] h-[40px] text-center rounded-md hover:bg-violet-800 border-2 border-gray-700 hover:text-white transition-all duration-200"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RevisionSection;
