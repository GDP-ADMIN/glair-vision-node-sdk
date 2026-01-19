// Singapore Work Permit has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

type WORK_PERMIT_FIELDS =
  | "cardNumber"
  | "cardType"
  | "dateOfApply"
  | "dateOfBirth"
  | "dateOfExpiry"
  | "dateOfIssue"
  | "employer"
  | "fin"
  | "location"
  | "name"
  | "nationality"
  | "occupation"
  | "sector"
  | "sex"
  | "workPermitNo";

export type SingaporeWorkPermit = {
  images?: {
    photo?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<WORK_PERMIT_FIELDS, { confidence?: number; confidenceText?: string; value?: string; valueOriginal?: string; polygon?: number[][]; pageIndex?: number }>> & {
    [key: string]: { 
      confidence?: number;
      confidenceText?: string;
      value?: string;
      valueOriginal?: string;
      polygon?: number[][];
      pageIndex?: number;
    } | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
