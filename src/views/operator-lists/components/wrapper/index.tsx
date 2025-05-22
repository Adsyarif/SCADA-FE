import { Search, Title } from "@/components";
import { useListOperator } from "../../hooks";
import { useSession } from "next-auth/react";

const OperatorListWrapper = () => {
  const { data: session } = useSession();
  const supervisorId = session?.user.id;
  const {
    data: operators,
    isLoading,
    isError,
  } = useListOperator(supervisorId || "");

  console.log(operators);

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
        {operators?.data.map((ops, idx) => {
          return <div key={idx}>{ops.operatorName}</div>;
        })}
      </div>
    </div>
  );
};

export default OperatorListWrapper;
