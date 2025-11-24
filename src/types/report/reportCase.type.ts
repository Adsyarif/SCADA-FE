export interface SupervisorsInterface {
  data: SupervisorInterface;
}

export interface SupervisorInterface {
  supervisorId: string;
  superVisorName: string;
}

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

export interface Option {
  id: string;
  label: string;
}

export interface FileInputProps {
  fileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

export interface ReportTextareaProps {
  value: string;
  onChange: (val: string) => void;
}

export interface CategorySelectProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export interface TitleProps {
  text: string;
  isButton?: boolean;
  handleBackClick?: () => void;
}
