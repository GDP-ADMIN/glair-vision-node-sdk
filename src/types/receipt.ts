// Receipt has regular fields and an items array
// Each field has confidence/value structure similar to KTP

import type { FieldValue } from "./common";

export type RECEIPT_FIELDS =
  | "merchant_name"
  | "merchant_place"
  | "merchant_address"
  | "merchant_phone_number"
  | "receipt_date"
  | "receipt_time"
  | "receipt_number"
  | "sub_total_amount"
  | "currency"
  | "payment_product"
  | "tax_amount"
  | "tip_amount"
  | "total_amount";

export type RECEIPT_ITEM_FIELDS =
  | "item_name"
  | "item_quantity"
  | "item_total_price"
  | "item_product_code";

// Receipt item row type
export type ReceiptItem = Partial<Record<RECEIPT_ITEM_FIELDS, FieldValue>> & {
  [key: string]: FieldValue | undefined;
};

export type Receipt = {
  read?: Partial<Record<RECEIPT_FIELDS, FieldValue>> & {
    items?: ReceiptItem[];
    [key: string]: FieldValue | ReceiptItem[] | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
