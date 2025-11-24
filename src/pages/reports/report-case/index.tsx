import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MobileLayout, MobileContainer } from "@/components/layout";
import { useReportCategory } from "@/hooks/report/useReportCategory";
import { useAsignedSupervisor } from "@/hooks/report/useAssignSupervisor";
import { SkeletonReportForm, Title } from "@/components";
import { ReportCaseForm } from "@/components/sections/report/reportCaseForm.component";

const ReportCasePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const staffId = session?.user?.id || "";

  const { isLoading: isCatLoading, error: catError } = useReportCategory();
  const { isLoading: isSupervisorLoading, error: supError } =
    useAsignedSupervisor(staffId);

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  console.log(isLoading);

  if (isCatLoading || isSupervisorLoading) {
    return (
      <MobileLayout>
        <MobileContainer>
          <SkeletonReportForm />
        </MobileContainer>
      </MobileLayout>
    );
  }

  if (catError || supError) {
    return (
      <MobileLayout>
        <MobileContainer>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center max-w-md w-full">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Terjadi Kesalahan
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {(catError || supError)?.message ||
                  "Gagal memuat data yang diperlukan"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-3 rounded-2xl font-medium hover:bg-blue-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </MobileContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <MobileContainer>
        <div className="min-h-screen bg-gray-50">
          <Title
            isButton={true}
            text="Buat Laporan Baru"
            handleBackClick={() => router.push("/reports")}
          />

          <div className="pt-8 px-5 pb-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4"></div>
                <p className="text-lg font-medium text-gray-700 text-center">
                  Mengirim laporan, mohon tunggu...
                </p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Laporan Anda sedang diproses
                </p>
                <style jsx>{`
                  .loader {
                    border-top-color: #2563eb;
                    animation: spin 1s linear infinite;
                  }
                  @keyframes spin {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </div>
            ) : (
              <ReportCaseForm onLoadingChange={handleLoadingChange} />
            )}
          </div>
        </div>
      </MobileContainer>
    </MobileLayout>
  );
};

export default ReportCasePage;
