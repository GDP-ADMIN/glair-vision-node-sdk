// STNK-v2 has a nested structure with multiple pages/sections
// Each page contains fields with confidence/value structure

import type { FieldValue } from "./common";
// Halaman STNK page fields
export type HalamanStnkFields = Partial<Record<
  | "alamat"
  | "bahan_bakar"
  | "berlaku_sampai"
  | "isi_silinder"
  | "jenis"
  | "kode_lokasi"
  | "merk"
  | "model"
  | "nama_pemilik"
  | "nomor_bpkb"
  | "nomor_identitas_pemilik"
  | "nomor_mesin"
  | "nomor_rangka"
  | "nomor_registrasi"
  | "nomor_stnk"
  | "nomor_urut_pendaftaran"
  | "polda_penerbitan"
  | "tahunPembuatan"
  | "tahun_registrasi"
  | "tanggal_penerbitan"
  | "tempat_penerbitan"
  | "tipe"
  | "warna"
  | "warnaTnkb",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Halaman Pajak Tahunan page fields
export type HalamanPajakTahunanFields = Partial<Record<
  | "alamat"
  | "bahan_bakar"
  | "berlaku_sampai"
  | "ditetapkan_tanggal"
  | "ident"
  | "isi_silinder"
  | "jenis"
  | "jumlah_sumbu"
  | "kepemilikan_ke"
  | "kode_njkb"
  | "merk"
  | "model"
  | "nama_pemilik"
  | "nomor_bpkb"
  | "nomor_identitas_pemilik"
  | "nomor_mesin"
  | "nomor_pajak_tahunan"
  | "nomor_rangka"
  | "nomor_registrasi"
  | "nomor_registrasi_lama"
  | "samsat_provinsi"
  | "tahun_pembuatan"
  | "tahun_registrasi"
  | "tipe"
  | "warna"
  | "warna_tnkb",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

export type STNK = {
  read?: {
    halamanStnk?: HalamanStnkFields;
    halamanPajakTahunan?: HalamanPajakTahunanFields;
    [key: string]: {
      [key: string]: FieldValue | undefined;
    } | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
