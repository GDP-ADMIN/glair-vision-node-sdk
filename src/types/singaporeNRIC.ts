// Singapore NRIC has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

import type { FieldValue } from "./common";
type NRIC_FIELDS =
  | "address"
  | "blood_type"
  | "card_number"
  | "country_of_birth"
  | "date_of_birth"
  | "issue_date"
  | "name"
  | "nationality"
  | "nric_no"
  | "race"
  | "sex";

export type SingaporeNRIC = {
  images?: {
    photo?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<NRIC_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
