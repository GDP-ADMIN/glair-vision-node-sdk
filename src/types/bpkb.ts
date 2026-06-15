import type { FieldValue } from "./common";
// BPKB-v2 has a nested structure with multiple pages/sections
// Each page contains fields with confidence/value structure

// Dokumen Registrasi Pertama page fields
export type DokumenRegistrasiPertamaFields = Partial<Record<
  | "nama_apm"
  | "nomor_faktur"
  | "nomor_form_abc"
  | "tanggal_faktur",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Halaman Terakhir page fields
export type HalamanTerakhirFields = Partial<Record<
  | "diterbitkan_oleh"
  | "no_register",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Identitas Kendaraan page fields
export type IdentitasKendaraanFields = Partial<Record<
  | "bahan_bakar"
  | "isi_silinder"
  | "jenis"
  | "jumlah_roda"
  | "jumlah_sumbu"
  | "merk"
  | "model"
  | "nomor_mesin"
  | "nomor_rangka"
  | "nomor_registrasi"
  | "tahun_pembuatan"
  | "type"
  | "warna"
  | "warna_tnkb",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Identitas Pemilik page fields
export type IdentitasPemilikFields = Partial<Record<
  | "alamat"
  | "alamat_email"
  | "dikeluarkan"
  | "nama_pemilik"
  | "no_ktp_tdp"
  | "no_telepon"
  | "nomor_bpkb"
  | "pada_tanggal"
  | "pekerjaan"
  | "stempel_nomor_bpkb",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

export type BPKB = {
  read?: {
    halamanRegistrasiPertama?: DokumenRegistrasiPertamaFields;
    halamanTerakhir?: HalamanTerakhirFields;
    identitasKendaraan?: IdentitasKendaraanFields;
    identitasPemilik?: IdentitasPemilikFields;
    [key: string]: {
      [key: string]: FieldValue | undefined;
    } | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
