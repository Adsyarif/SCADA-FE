import { SearchBar, Title } from "@/components";

const OperatorListWrapper = () => {
  return (
    <div className="h-full">
      <Title isButton={true} text={"Daftar Operator"} />
      <div className="bg-[#E8E8E8]">
        <SearchBar
          placeholder="Cari operator..."
          apiEndPoint=""
          onResult={(data) => console.log(data)}
        />
        {/* List of operator */}
      </div>
    </div>
  );
};

export default OperatorListWrapper;
