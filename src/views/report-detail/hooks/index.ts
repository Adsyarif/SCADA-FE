import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosClient";
import { ReportDetail } from "../type/reportReply";

export const useDetailReport = (reportId: string) => {
  return useQuery<{ data: ReportDetail }, Error>({
    queryKey: ["report", reportId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/reports/get-report-by-id/${reportId}`
      );
      if (!response.data?.data) {
        throw new Error("Invalid response format");
      }
      return {
        data: {
          ...response.data.data,
          replies: response.data.data.replies || [],
        },
      };
    },
    enabled: !!reportId,
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      reportId: string;
      userId: string;
      message: string;
      parentReplyId?: string;
    }) =>
      axiosInstance.post(`/api/reports/${data.reportId}/replies`, {
        userId: data.userId,
        message: data.message,
        parentReplyId: data.parentReplyId,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["report", variables.reportId],
      });
    },
  });
};

export const useApproveReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, userId }: { reportId: string; userId: string }) =>
      axiosInstance.put(`/api/reports/${reportId}/approve`, { userId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["report", variables.reportId],
      });
    },
  });
};

export const useRejectReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, userId }: { reportId: string; userId: string }) =>
      axiosInstance.put(`/api/reports/${reportId}/reject`, { userId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["report", variables.reportId],
      });
    },
  });
};

export const useRequestRevision = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reportId,
      userId,
      message,
    }: {
      reportId: string;
      userId: string;
      message: string;
    }) =>
      axiosInstance.put(`/api/reports/${reportId}/request-revision`, {
        userId,
        message,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["report", variables.reportId],
      });
    },
  });
};
