// Singapore NRIC has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

type NRIC_FIELDS =
  | "address"
  | "bloodType"
  | "cardNumber"
  | "countryOfBirth"
  | "dateOfBirth"
  | "issueDate"
  | "name"
  | "nationality"
  | "nricNo"
  | "race"
  | "sex";

export type SingaporeNRIC = {
  images?: {
    photo?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<NRIC_FIELDS, { confidence?: number; confidenceText?: string; value?: string; valueOriginal?: string; polygon?: number[][]; pageIndex?: number }>> & {
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
