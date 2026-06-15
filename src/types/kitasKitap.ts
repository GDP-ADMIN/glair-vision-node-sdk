import type { FieldValue } from "./common";

export type KITAS_KITAP_FIELDS =
  | "photo"
  | "sign"
  | "address"
  | "date_of_birth"
  | "document_type"
  | "full_name"
  | "gender"
  | "guarantor_name"
  | "issued_date"
  | "issued_place"
  | "nationality"
  | "niora"
  | "occupation"
  | "office_address"
  | "office_name"
  | "office_region"
  | "passport_expiry"
  | "passport_number"
  | "permit_number"
  | "place_of_birth"
  | "status"
  | "stay_entries_permit_expiry"
  | "stay_multiple_entries_permit_expiry"
  | "stay_permit_index";

export type KitasKitap = {
  read?: Partial<Record<KITAS_KITAP_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
