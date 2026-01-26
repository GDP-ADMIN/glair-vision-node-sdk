// SIM has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

import type { FieldValue } from "./common";
type SIM_FIELDS =
  | "alamat"
  | "berlaku"
  | "foto"
  | "golongan_darah"
  | "jenis_kelamin"
  | "nama"
  | "nomor_sim"
  | "pekerjaan"
  | "tanggal_lahir"
  | "tanda_tangan"
  | "tempat_lahir"
  | "tinggi"
  | "tipe_sim"
  | "wilayah";

export type SIM = {
  images?: {
    foto?: string;
    tandaTangan?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<SIM_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
