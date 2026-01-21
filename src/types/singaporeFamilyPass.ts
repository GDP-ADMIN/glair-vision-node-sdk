// Singapore Family Pass has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

import { FieldValue } from "./common";

type FAMILY_PASS_FIELDS =
  | "address"
  | "card_number"
  | "card_type"
  | "date_of_birth"
  | "expiry_date"
  | "fin"
  | "issue_date"
  | "name"
  | "nationality"
  | "pass_status"
  | "sex";

export type SingaporeFamilyPass = {
  images?: {
    photo?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<FAMILY_PASS_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
