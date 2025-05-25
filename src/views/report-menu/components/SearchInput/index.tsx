interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchInput = ({ searchText, setSearchText }: Props) => (
  <div className=" rounded">
    <input
      type="text"
      placeholder="Cari laporan..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="w-full p-2 rounded shadow bg-gray-100 focus:outline-none"
    />
  </div>
);

export default SearchInput;
