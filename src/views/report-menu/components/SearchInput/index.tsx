interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchInput = ({ searchText, setSearchText }: Props) => (
  <div className="bg-gray-100 p-2 rounded">
    <input
      type="text"
      placeholder="Cari laporan..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="w-full p-2 rounded border"
    />
  </div>
);

export default SearchInput;
