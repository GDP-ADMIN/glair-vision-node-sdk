// NPWP has regular text fields
// Each field has confidence/value structure similar to KTP
import type { FieldValue } from "./common";
export type NPWP_FIELDS = "no_npwp" | "nik" | "nama" | "alamat";

export type NPWP = {
  read?: Partial<Record<NPWP_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
