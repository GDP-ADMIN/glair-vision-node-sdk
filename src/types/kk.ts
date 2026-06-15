// KK-v2 has regular fields and a table array containing family member records
// Each field has confidence/value structure similar to KTP
import type { FieldValue } from "./common";

export type KK_FIELDS =
  | "alamat"
  | "desa_kelurahan"
  | "kabupaten_kota"
  | "kecamatan"
  | "kode_pos"
  | "nama_kepala_keluarga"
  | "nomor_blanko"
  | "nomor_kk"
  | "provinsi"
  | "rt_rw"
  | "tanggal_dikeluarkan";

export type KK_TABLE_FIELDS =
  | "agama"
  | "golongan_darah"
  | "jenis_kelamin"
  | "jenis_pekerjaan"
  | "kewarganegaraan"
  | "nama_ayah"
  | "nama_ibu"
  | "nama_lengkap"
  | "nik"
  | "no"
  | "no_kitas_kitap"
  | "no_paspor"
  | "pendidikan"
  | "status_hubungan_dalam_keluarga"
  | "status_perkawinan"
  | "tanggal_lahir"
  | "tanggal_perkawinan"
  | "tempat_lahir";

// Table row type (each family member)
export type KKTableRow = Partial<Record<KK_TABLE_FIELDS, FieldValue>> & {
  [key: string]: FieldValue | undefined;
};

export type KK = {
  read?: Partial<Record<KK_FIELDS, FieldValue>> & {
    table?: KKTableRow[];
    [key: string]: FieldValue | KKTableRow[] | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
