// Receipt has regular fields and an items array
// Each field has confidence/value structure similar to KTP

type FieldValue = {
  confidence?: number;
  confidenceText?: string;
  value?: string;
  valueOriginal?: string;
  polygon?: number[][];
  pageIndex?: number;
};

type RECEIPT_FIELDS =
  | "merchantName"
  | "merchantAddress"
  | "receiptDate"
  | "receiptTime"
  | "subTotalAmount"
  | "taxAmount"
  | "tipAmount"
  | "totalAmount";

type ITEM_FIELDS =
  | "itemName"
  | "itemQuantity"
  | "itemTotalPrice"
  | "itemProductCode";

// Receipt item row type
type ReceiptItem = Partial<Record<ITEM_FIELDS, FieldValue>> & {
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
