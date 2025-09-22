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

export interface ReportListResponseProps {
  data: ReportListResponseDataInterface[];
}

export type Report = ReportListResponseDataInterface;

export interface ReportListProps {
  reports: Report[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export interface SearchInputProps {
  searchText: string;
  setSearchText: (value: string) => void;
}

export interface TitleProps {
  text: string;
  isButton?: boolean;
  handleBackClick?: () => void;
  backHref?: string;
}

export interface StatusConfig {
  bg: string;
  text: string;
  border: string;
  label: string;
  icon: string;
}
