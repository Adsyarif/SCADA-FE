export interface ReportListResponseProps {
  data: ReportListResponseDataInterface[];
}

export interface ReportListResponseDataInterface {
  reportId: string;
  reportToId: string;
  reportTo: string;
  create_at: Date;
  reportCategoryId: string;
  reportCategory: string;
  reportDescription: string;
  status: "PENDING" | "REJECTED" | "APPROVED" | "REVISION";
}
