import type { FieldValue } from "./common";

type BSTK_FIELDS =
  | "document_type"
  | "document_number"
  | "office_name"
  | "office_branch"
  | "vehicle_handover_date"
  | "vehicle_handover_time"
  | "vehicle_brand"
  | "vehicle_model"
  | "vehicle_license_number"
  | "vehicle_chassis_number"
  | "vehicle_engine_number"
  | "vehicle_color"
  | "vehicle_mileage"
  | "vehicle_headlights_condition"
  | "vehicle_rearlights_condition"
  | "vehicle_mirrors_condition"
  | "vehicle_body_condition"
  | "vehicle_ac_condition"
  | "vehicle_audio_system_condition"
  | "vehicle_power_window_condition"
  | "vehicle_seats_condition"
  | "vehicle_registration_document"
  | "vehicle_ownership_document"
  | "vehicle_manual_book"
  | "vehicle_inspection_document_available"
  | "vehicle_inspection_valid_until"
  | "handover_notes"
  | "creditor_representative_name"
  | "pool_representative_name"
  | "handover_signature_date"
  | "vehicle_price"
  | "vehicle_manufacturing_year"
  | "vehicle_type";

export type BSTK = {
  read?: Partial<Record<BSTK_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
