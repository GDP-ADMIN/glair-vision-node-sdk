import type { FieldValue } from "./common";

type SKPR_FIELDS =
  | "debit_account_request_type"
  | "complete_name"
  | "id_card_number"
  | "validity_period"
  | "act_for"
  | "position"
  | "company_name"
  | "address"
  | "rt_rw"
  | "district"
  | "city"
  | "zip_code"
  | "province"
  | "attorney_in_fact_name"
  | "attorney_in_fact_address"
  | "attorney_in_fact_id_card_number"
  | "attorney_in_fact_company_code"
  | "office_phone"
  | "home_phone"
  | "mobile_phone_number_1"
  | "mobile_phone_number_2"
  | "account_number"
  | "email_address"
  | "bank_name"
  | "account_currency"
  | "policy_currency"
  | "policy_amount"
  | "signing_date"
  | "signing_location";

type BANK_ACCOUNT_DETAIL_FIELDS =
  | "bank_account_number"
  | "bank_account_owner_name";

type POLICY_DETAIL_FIELDS =
  | "policy_number"
  | "policyholder_name"
  | "relationship_with_policyholder";

type BankAccountDetail =
  Partial<Record<BANK_ACCOUNT_DETAIL_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };

type PolicyDetail =
  Partial<Record<POLICY_DETAIL_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };

export type SKPR = {
  read?: Partial<Record<SKPR_FIELDS, FieldValue>> & {
    bank_account_details?: BankAccountDetail[];
    policy_details?: PolicyDetail[];
    [key: string]:
      | FieldValue
      | BankAccountDetail[]
      | PolicyDetail[]
      | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};