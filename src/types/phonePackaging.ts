import type { FieldValue } from "./common";

type PHONE_PACKAGING_FIELDS =
  | "serial_number"
  | "brand"
  | "handphone_type"
  | "memory"
  | "camera_pixel"
  | "screen_size"
  | "processor"
  | "battery_size"
  | "storage_size"
  | "handphone_color";

export type PhonePackaging = {
  read?: Partial<Record<PHONE_PACKAGING_FIELDS, FieldValue>> & {
    imei?: FieldValue[];
    [key: string]: FieldValue | FieldValue[] | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};