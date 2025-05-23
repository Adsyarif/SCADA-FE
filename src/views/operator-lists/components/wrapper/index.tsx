import { Title } from "@/components";
import { useEffect, useState } from "react";
import { useListOperator, ListOperatorProps } from "../../hooks";
import { useSession } from "next-auth/react";
import { LucideLoader, LucideSearch } from "lucide-react";
import Link from 'next/link';


const OperatorListWrapper = () => {
  const { data: session } = useSession();
  const supervisorId = session?.user.id || "";

  const {
    data: operators,
    isLoading: loadingOperators,
    isError,
  } = useListOperator(supervisorId);

  const [filteredOperators, setFilteredOperators] = useState<ListOperatorProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (operators?.data) {
      setFilteredOperators(operators.data);
    }
  }, [operators]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!operators?.data || !searchInput) return;
  
    setIsSearching(true);
  
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    const filtered = operators.data.filter((op) =>
      op.operatorName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredOperators(filtered);
    setIsSearching(false);
  };

  return (
    <div className="flex grow">
      <div className="grow w-full">
        <Title isButton={true} text="Daftar Operator" />
        <div className="bg-[#E8E8E8]">

          {/* FORM SEACRH */}
          <form onSubmit={handleSearch}>
            <div className="flex justify-between items-center py-2 px-5 gap-4">
              <input
                type="text"
                className="w-full bg-white rounded-xl py-1 px-3 focus:outline-none"
                placeholder="Cari operator..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <LucideLoader className="animate-spin" />
                ) : (
                  <LucideSearch />
                )}
              </button>
            </div>
          </form>

          {/* LIST OPERATOR */}
          <div className="p-4">
            {filteredOperators.map((ops, idx) => (
              <div key={idx} className="flex items-center my-3">
                <img
                  src="http://fakeimg.pl/500x500?text=%F0%9F%91%A4&"
                  alt={`${ops.operatorName} profile`}
                  className="w-13 h-13 rounded-full mr-2"
                />
                <div className="flex-grow p-2 bg-white border-b border-gray-200 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{ops.operatorName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-green-600 hover:text-green-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </button>
                    <Link href="/list-operator/log-report">
                      <button className="text-green-600 hover:text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          strokeWidth={1.5} stroke="currentColor" className="size-8">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 
                            1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {!isSearching && filteredOperators.length === 0 && (
              <p className="text-center text-gray-500 mt-4">Data operator tidak ditemukan.</p>
            )}
          </div>
        </div>
        {operators?.data.map((ops, idx) => {
          return (
            <div key={idx}>
              <div>{ops.operatorName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OperatorListWrapper;
