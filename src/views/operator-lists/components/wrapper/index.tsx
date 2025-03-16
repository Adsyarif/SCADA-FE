import { Search, Title } from "@/components";

interface dataOperatorProps {
  name: string;
  position: string;
  report: () => string;
}

const OperatorListWrapper = () => {
  return (
    <div className="flex grow">
      <div className="grow w-full">
        <Title isButton={true} text="Daftar Operator" />
        <div className="bg-[#E8E8E8]">
          <Search
            placeholder="Cari operator..."
            apiEndPoint="/api/operators"
            type={"operator"}
          />
        </div>
      </div>
    </div>
  );
};

export default OperatorListWrapper;
