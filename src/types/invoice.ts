// Invoice has regular fields and an items array
// Each field has confidence/value structure similar to KTP

import type { FieldValue } from "./common";
type INVOICE_FIELDS =
  | "invoice_number"
  | "invoice_date"
  | "invoice_due_date"
  | "purchase_order"
  | "vendor_name"
  | "vendor_tax_id"
  | "vendor_address"
  | "customer_name"
  | "customer_tax_id"
  | "customer_address"
  | "shipping_address"
  | "shipping_address_recipient"
  | "payment_term"
  | "sub_total_amount"
  | "invoice_total_tax"
  | "invoice_total"
  | "remittance_address"
  | "remittance_address_recipient"
  | "currency";

type ITEM_FIELDS =
  | "item_name"
  | "item_quantity"
  | "item_price"
  | "item_unit_price"
  | "item_product_code"
  | "item_unit";

// Invoice item row type
type InvoiceItem = Partial<Record<ITEM_FIELDS, FieldValue>> & {
  [key: string]: FieldValue | undefined;
};

export type Invoice = {
  read?: Partial<Record<INVOICE_FIELDS, FieldValue>> & {
    items?: InvoiceItem[];
    [key: string]: FieldValue | InvoiceItem[] | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
