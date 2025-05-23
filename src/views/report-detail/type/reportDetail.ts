import { ReportCategory } from "@/views/report-case/types/report";

export interface ReportListResponseProps {
  data: ReportDetailResponseDataInterface;
}

interface ReportDetailResponseDataInterface {
  reportId: string;
  reportToId: string;
  reportTo: string;
  create_at: Date;
  reportCategoryId: string;
  reportCategoryName: string;
  reportDescription: string;
  reportImage: string;
}

export interface ReportDetailInterface {
  reportDetailId: string;
}
