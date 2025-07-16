import ResultResponse from "@/components/resultResponse";

const ReportError = () => {
  return (
    <ResultResponse
      isSuccess={false}
      title={"Gagal mengirim laporan!"}
      description={"Laporan kamu tidak berhasil dikirimkan."}
      redirect={"/report-case"}
      btnName={"Kembali"}
    />
  );
};

export default ReportError;
