import type { FieldValue } from "./common";

type SPK_FIELDS =
  | "dealer_name"
  | "spk_dealer_number"
  | "spk_date"
  | "automotive_brand"
  | "automotive_model"
  | "automotive_unit_count"
  | "on_the_road_price_per_unit"
  | "discount_per_unit"
  | "net_price_per_unit"
  | "buyer_name"
  | "buyer_address"
  | "buyer_phone_number"
  | "buyer_email"
  | "sales_name"
  | "sales_phone_number";

export type SPK = {
  read?: Partial<Record<SPK_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};