// Singapore Family Pass has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

type FAMILY_PASS_FIELDS =
  | "address"
  | "cardNumber"
  | "cardType"
  | "dateOfBirth"
  | "expiryDate"
  | "fin"
  | "issueDate"
  | "name"
  | "nationality"
  | "passStatus"
  | "sex";

export type SingaporeFamilyPass = {
  images?: {
    photo?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<FAMILY_PASS_FIELDS, { confidence?: number; confidenceText?: string; value?: string; valueOriginal?: string; polygon?: number[][]; pageIndex?: number }>> & {
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
