export interface ReportCategoriesInterface {
  data: ReportCategory[];
}

export interface ReportCategory {
  categoryId: string;
  categoryName: string;
}

export interface CreateReportInterfaceRequest {
  reportToId: string;
  reportFromId: string;
  reportCategoryId: string;
  updatedBy?: string | null | undefined;
  reportImage?: string | null | undefined;
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
