import type { FieldValue } from "./common";

export type BANK_STATEMENT_FIELDS =
  | "bank_name"
  | "start_period"
  | "end_period"
  | "account_number"
  | "account_name"
  | "beginning_balance"
  | "total_debit_transaction"
  | "total_credit_transaction"
  | "currency"
  | "product_name"
  | "total_transactions";

export type TRANSACTION_FIELDS =
  | "posting_date"
  | "posting_time"
  | "effective_date"
  | "effective_time"
  | "description"
  | "debit_transaction"
  | "credit_transaction"
  | "mutation_amount"
  | "signed_amount";

export type BankStatementTransaction = Partial<Record<TRANSACTION_FIELDS, FieldValue>> & {
  [key: string]: FieldValue | undefined;
};

export type BankStatement = {
  read?: Partial<Record<BANK_STATEMENT_FIELDS, FieldValue>> & {
    transactions?: BankStatementTransaction[];
    [key: string]: FieldValue | BankStatementTransaction[] | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
