// Passport has regular text fields
// Each field has confidence/value structure similar to KTP

type PASSPORT_FIELDS =
  | "birthDate"
  | "birthDateHash"
  | "country"
  | "docNumber"
  | "docNumberHash"
  | "documentType"
  | "expiryDate"
  | "expiryDateHash"
  | "finalHash"
  | "name"
  | "nationality"
  | "optionalData"
  | "optionalDataHash"
  | "sex"
  | "surname";

export type Passport = {
  read?: Partial<Record<PASSPORT_FIELDS, { confidence?: number; confidenceText?: string; value?: string; valueOriginal?: string; polygon?: number[][]; pageIndex?: number }>> & {
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
