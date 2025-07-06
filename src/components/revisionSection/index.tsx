import { useState } from "react";

const RevisionSection = () => {
  const [isVisible, SetIsVisible] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const showTextarea = () => {
    SetIsVisible(true);
    setButtonsDisabled(true);

    document
      .getElementById("accept-button")
      ?.classList.add("bg-gray-300", "text-dark", "cursor-not-allowed");
    document
      .getElementById("accept-button")
      ?.classList.remove("bg-violet-500", "text-white", "hover:bg-violet-800");
    document
      .getElementById("revision-button")
      ?.classList.remove("hover:bg-violet-800", "hover:text-white");
    document
      .getElementById("revision-button")
      ?.classList.add("hover:text-black", "cursor-not-allowed");
  };

  const cancelButton = () => {
    SetIsVisible(false);
    setButtonsDisabled(false);

    document
      .getElementById("accept-button")
      ?.classList.remove("bg-gray-300", "text-dark", "cursor-not-allowed");
    document
      .getElementById("accept-button")
      ?.classList.add("bg-violet-500", "text-white", "hover:bg-violet-800");
    document
      .getElementById("revision-button")
      ?.classList.add("hover:bg-violet-800", "hover:text-white");
    document
      .getElementById("revision-button")
      ?.classList.remove("cursor-not-allowed");
  };

  return (
    <>
      <div className="flex justify-center space-x-6 mb-5">
        <button
          disabled={buttonsDisabled}
          id="accept-button"
          className="bg-violet-500 text-sm text-white w-[100px] h-[40px] text-center rounded-md hover:bg-violet-800"
        >
          Terima
        </button>
        <button
          onClick={showTextarea}
          disabled={buttonsDisabled}
          id="revision-button"
          className="bg-white text-sm text-dark w-[100px] h-[40px] text-center rounded-md hover:bg-violet-800 border-2 border-dark hover:text-white"
        >
          Butuh Revisi
        </button>
      </div>

      <div id="revision-form" className={isVisible ? "visible" : "hidden"}>
        <div className="mb-5">
          <textarea
            className="rounded-md p-2 w-full h-full border border-gray-300"
            placeholder="Tulis revisi di sini..."
            rows={5}
          />
        </div>

        <div className="flex justify-center space-x-6 mb-5">
          <button
            id="send-button"
            className="bg-violet-500 text-sm text-white w-[100px] h-[40px] text-center rounded-md hover:bg-violet-800"
          >
            Kirim
          </button>
          <button
            onClick={cancelButton}
            id="cancel-button"
            className="bg-white text-sm text-dark w-[100px] h-[40px] text-center rounded-md hover:bg-violet-800 border-2 border-dark hover:text-white"
          >
            Batal
          </button>
        </div>
      </div>
    </>
  );
};

export default RevisionSection;
