import { LucideLoader, LucideSearch } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder: string;
  apiEndPoint: string;
  onResult: (data: any) => void;
}

const SearchBar = ({ placeholder, apiEndPoint, onResult }: SearchBarProps) => {
  const [item, setItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        onResult(data);
      } catch (err: unknown) {
        const errMessage =
          err instanceof Error ? err.message : "Unknown error occurred.";
        onResult(errMessage);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
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
  );
};

export default SearchBar;
