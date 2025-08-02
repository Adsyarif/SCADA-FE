import dynamic from "next/dynamic";

const DynamicResultResponse = dynamic(
  () => import("@/components/resultResponse"),
  { ssr: false }
);

const ReportSuccess = () => {
  return (
    <DynamicResultResponse
      isSuccess={true}
      title={"Berhasil mengirim laporan!"}
      description={"Laporan kamu telah berhasil dikirimkan."}
      redirect={"/homepage"}
      btnName={"Kembali"}
    />
  );
};

export default ReportSuccess;
