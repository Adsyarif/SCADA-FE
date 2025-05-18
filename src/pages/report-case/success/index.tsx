import ResultResponse from "@/components/resultResponse";

const ReportSucces = () => {
  return (
    <ResultResponse
      isSuccess={true}
      title={"Berhasil mengirim laporan!"}
      description={"Laporan kamu telah berhasil dikirimkan."}
      redirect={"/homepage"}
      btnName={"Kembali"}
    />
  );
};

export default ReportSucces;
