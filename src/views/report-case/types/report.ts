export interface ReportCategoriesInterface {
  data: ReportCategory[];
}

export interface ReportCategory {
  categoryId: string;
  categoryName: string;
}

export interface CreateReportInterfaceRequest {
  reportToId: string | undefined;
  reportFromId: string | undefined;
  reportCategoryId: string;
  updatedBy?: string;
  reportImage?: string | null;
  reportDescription: string;
}

export interface CreateReportInterfaceResponse {
  reportToId: string;
  reportFromId: string;
  reportCategoryId: string;
  updatedBy?: string;
  reportImage?: string;
  reportDescription: string;
}
