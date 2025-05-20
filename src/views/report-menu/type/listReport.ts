import { ReportCategory } from "@/views/report-case/types/report";

export interface ReportListResponseProps {
  data: ReportListResponseDataInterface[];
}

interface ReportListResponseDataInterface {
  reportId: string;
  reportToId: string;
  reportTo: string;
  create_at: Date;
  reportCategoryId: string;
  reportCategory: string;
  reportDescription: string;
}
