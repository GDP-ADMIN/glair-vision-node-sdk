// Singapore Work Permit has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

import { FieldValue } from "./common";

type WORK_PERMIT_FIELDS =
  | "card_number"
  | "card_type"
  | "date_of_apply"
  | "date_of_birth"
  | "date_of_expiry"
  | "date_of_issue"
  | "employer"
  | "fin"
  | "location_work"
  | "name"
  | "nationality"
  | "occupation"
  | "sector"
  | "sex"
  | "work_permit_no";

export type SingaporeWorkPermit = {
  images?: {
    photo?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<WORK_PERMIT_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
