// Invoice has regular fields and an items array
// Each field has confidence/value structure similar to KTP

type FieldValue = {
  confidence?: number;
  confidenceText?: string;
  value?: string;
  valueOriginal?: string;
  polygon?: number[][];
  pageIndex?: number;
};

type INVOICE_FIELDS =
  | "invoiceNumber"
  | "invoiceDate"
  | "invoiceDueDate"
  | "purchaseOrder"
  | "vendorName"
  | "vendorTaxId"
  | "vendorAddress"
  | "customerName"
  | "customerTaxId"
  | "customerAddress"
  | "shippingAddress"
  | "shippingAddressRecipient"
  | "paymentTerm"
  | "subTotalAmount"
  | "invoiceTotalTax"
  | "invoiceTotal"
  | "remittanceAddress"
  | "remittanceAddressRecipient"
  | "currency";

type ITEM_FIELDS =
  | "itemName"
  | "itemQuantity"
  | "itemPrice"
  | "itemUnitPrice"
  | "itemProductCode"
  | "itemUnit";

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
