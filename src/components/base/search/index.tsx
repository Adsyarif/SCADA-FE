import ContactItem from "../contactItem/";
import { LucideLoader, LucideSearch } from "lucide-react";
import { useState } from "react";

interface SearchProps {
  placeholder: string;
  apiEndPoint: string;
  type: string;
}

interface dataOperatorProps {
  name: string;
  position: string;
  report: () => string;
}

const Search = ({ placeholder, apiEndPoint, type }: SearchProps) => {
  const [item, setItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showData, setShowData] = useState<dataOperatorProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setItem(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!item) return;

    setIsLoading(true);

    // set time out untuk melihat loading saja
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${apiEndPoint}?key=${encodeURIComponent(item)}`
        ); //harus ditentuin query format nya
        const data = await response.json();
        setShowData(data);
      } catch (err: unknown) {
        const errMessage =
          err instanceof Error ? err.message : "Unknown error occurred.";
        console.error(errMessage);
        setError(errMessage);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center py-2 px-5 gap-4">
          <input
            type="text"
            className="w-full bg-white rounded-xl py-1 px-3 focus:outline-none"
            placeholder={placeholder}
            onChange={handleChange}
            value={item}
          />
          <button type="submit" className="" disabled={isLoading}>
            {isLoading ? (
              <LucideLoader className="animate-spin " />
            ) : (
              <LucideSearch />
            )}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 px-5">{error}</p>}

      <div className="p-5">
        {showData.length > 0
          ? showData.map((operator, index) => (
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
              <p className="text-gray-500">Tidak ada {type} ditemukan.</p>
            )}
      </div>
    </>
  );
};

export default Search;
