export interface ReportDetailInterface {
  reportDetailId: string;
}

export interface ReportListResponseProps {
  data: ReportDetail;
}

export interface ReportDetail {
  reportId: string;
  reportToId: string;
  reportTo: string;
  reportFromId: string;
  reportToName: string;
  create_at: Date;
  reportCategoryId: string;
  reportCategoryName: string;
  reportDescription: string;
  reportImage?: string;
  status: string;
  replies: ReplyDetail[];
}

export interface ReplyDetail {
  replyId: string;
  userId: string;
  username: string;
  message: string;
  parentReplyId?: string;
  createdAt: Date;
  replies: ReplyDetail[];
}

export interface CreateReplyRequest {
  reportId: string;
  userId: string;
  message: string;
  parentReplyId?: string;
}
