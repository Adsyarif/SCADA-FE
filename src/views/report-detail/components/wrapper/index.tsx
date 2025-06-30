import { useSession } from "next-auth/react";
import {
  useDetailReport,
  useCreateReply,
  useApproveReport,
  useRejectReport,
  useRequestRevision,
} from "../../hooks";
import { Title } from "@/components";
import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ReportDetailInterface } from "../../type/reportDetail";
import { ReplyDetail } from "../../type/reportReply";
import { useRouter } from "next/router";

const ReportDetail = ({ reportDetailId }: ReportDetailInterface) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const userRole = session?.user.role;
  const router = useRouter();

  const {
    data: reportDetail,
    isLoading,
    isError,
    refetch,
  } = useDetailReport(reportDetailId);

  const [replyMessage, setReplyMessage] = useState("");
  const [parentReplyId, setParentReplyId] = useState<string | null>(null);
  const [revisionText, setRevisionText] = useState("");

  const { mutate: createReply } = useCreateReply();
  const { mutate: approveReport } = useApproveReport();
  const { mutate: rejectReport } = useRejectReport();
  const { mutate: requestRevision } = useRequestRevision();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading report</p>;
  if (!reportDetail || !reportDetail.data) {
    return <p>Data not found</p>;
  }
  console.log("user role", userRole);
  console.log("data", reportDetail?.data);
  const {
    reportId,
    reportToName,
    create_at,
    reportCategoryName,
    reportDescription,
    reportImage,
    status,
    replies = [],
  } = reportDetail?.data || {};

  const handleReplySubmit = () => {
    if (!replyMessage.trim()) return;

    createReply(
      {
        reportId,
        userId: userId!,
        message: replyMessage,
        parentReplyId: parentReplyId || undefined,
      },
      {
        onSuccess: () => {
          setReplyMessage("");
          setParentReplyId(null);
          refetch();
        },
      }
    );
  };

  const handleApprove = () => {
    approveReport(
      { reportId, userId: userId! },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  const handleReject = () => {
    rejectReport(
      { reportId, userId: userId! },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  const handleRequestRevision = () => {
    if (!revisionText.trim()) return;

    requestRevision(
      {
        reportId,
        userId: userId!,
        message: revisionText,
      },
      {
        onSuccess: () => {
          setRevisionText("");
          refetch();
        },
      }
    );
  };

  console.log(reportToName);

  const renderReplies = (replies: ReplyDetail[] = [], depth = 0) => {
    if (!replies || !Array.isArray(replies)) return null;
    return replies.map((reply) => (
      <div
        key={reply.replyId}
        className={`mt-4 ${
          depth > 0 ? "ml-8 border-l-2 border-gray-200 pl-4" : ""
        }`}
      >
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{reply.username}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(reply.createdAt), "dd MMM yyyy HH:mm", {
                  locale: id,
                })}
              </p>
            </div>
            {userRole === "supervisor" && (
              <button
                onClick={() => setParentReplyId(reply.replyId)}
                className="text-sm text-violet-500 hover:text-violet-700"
              >
                Reply
              </button>
            )}
          </div>
          <p className="mt-2 text-gray-700">{reply.message}</p>
        </div>

        {parentReplyId === reply.replyId && (
          <div className="mt-3 ml-4">
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Write your reply..."
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setParentReplyId(null)}
                className="px-3 py-1 text-sm bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReplySubmit}
                className="px-3 py-1 text-sm bg-violet-500 text-white rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        )}
        {replies && replies.length > 0 ? (
          <div className="space-y-4">{renderReplies(replies)}</div>
        ) : (
          <p className="text-gray-500 text-center py-4">Belum ada diskusi</p>
        )}
      </div>
    ));
  };

  return (
    <div className="flex grow">
      <div className="grow w-full">
        <Title
          isButton={true}
          text="Laporan"
          handleBackClick={() => router.back()}
        />
        <div className="p-6">
          <div className="mb-5">
            <h2 className="text-md font-bold">Kepada:</h2>
            <div className="flex justify-between">
              <p className="capitalize">{reportToName}</p>
              <p>
                {format(new Date(create_at), "dd MMM yyyy HH:mm", {
                  locale: id,
                })}
              </p>
            </div>
          </div>
          <div className="mb-5">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {reportCategoryName}
                </span>
                <span
                  className={`ml-2 inline-block px-3 py-1 rounded-full text-sm ${
                    status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : status === "REVISION"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {status === "APPROVED"
                    ? "Disetujui"
                    : status === "REJECTED"
                    ? "Ditolak"
                    : status === "REVISION"
                    ? "Butuh Revisi"
                    : "Menunggu"}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-line">
                {reportDescription}
              </p>
              {reportImage && (
                <div className="mt-4">
                  <img
                    src={reportImage}
                    alt="Report attachment"
                    className="max-w-full h-auto rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          {userRole === "supervisor" && status === "PENDING" && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h3 className="font-semibold mb-3">Tindakan Supervisor</h3>
              <div className="flex space-x-4">
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Setujui
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Tolak
                </button>
                <div className="relative flex-grow">
                  <textarea
                    value={revisionText}
                    onChange={(e) => setRevisionText(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Berikan catatan revisi..."
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setRevisionText("")}
                      className="px-3 py-1 text-sm bg-gray-200 rounded-md"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleRequestRevision}
                      disabled={!revisionText.trim()}
                      className={`px-3 py-1 text-sm rounded-md ${
                        revisionText.trim()
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Minta Revisi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Diskusi</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Tulis balasan Anda..."
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyMessage.trim()}
                  className={`px-4 py-2 rounded-md ${
                    replyMessage.trim()
                      ? "bg-violet-500 text-white hover:bg-violet-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Kirim
                </button>
              </div>
            </div>
            {replies && replies.length > 0 ? (
              <div className="space-y-4">{renderReplies(replies)}</div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Belum ada diskusi
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
