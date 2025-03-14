import { ContactItem, SearchBar, Title } from "@/components";
import { useState } from "react";

interface dataOperatorProps {
  name: string;
  position: string;
  report: () => string;
}

const OperatorListWrapper = () => {
  const [showOperator, setShowOperator] = useState<dataOperatorProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const findData = (data: dataOperatorProps[] | { error: string }) => {
    if ("error" in data) {
      setError(data.error);
      setShowOperator([]);
    } else {
      setError(null);
      setShowOperator(data);
    }
  };
  return (
    <div className="h-full">
      <Title isButton={true} text="Daftar Operator" />
      <div className="bg-[#E8E8E8]">
        <SearchBar
          placeholder="Cari operator..."
          apiEndPoint="/api/operators"
          onResult={findData}
        />

        {error && <p className="text-red-500 px-5">{error}</p>}

        <div className="p-5">
          {showOperator.length > 0
            ? showOperator.map((operator, index) => (
                <ContactItem
                  key={index}
                  type={{
                    page: "operator",
                    action: () => {}, // ganti page ke halaman profile operator
                    extendAction: operator.report,
                  }}
                  name={operator.name}
                  desc={operator.position}
                />
              ))
            : !error && (
                <p className="text-gray-500">Tidak ada operator ditemukan.</p>
              )}
        </div>
      </div>
    </div>
  );
};

export default OperatorListWrapper;
