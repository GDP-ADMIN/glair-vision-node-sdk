// Passport has regular text fields
// Each field has confidence/value structure similar to KTP

import type { FieldValue } from "./common";
export type PASSPORT_FIELDS =
  | "birth_date"
  | "birth_date_hash"
  | "country"
  | "doc_number"
  | "doc_number_hash"
  | "document_type"
  | "expiry_date"
  | "expiry_date_hash"
  | "final_hash"
  | "name"
  | "nationality"
  | "optional_data"
  | "optional_data_hash"
  | "sex"
  | "surname";

export type Passport = {
  read?: Partial<Record<PASSPORT_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
