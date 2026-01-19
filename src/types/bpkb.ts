// BPKB-v2 has a nested structure with multiple pages/sections
// Each page contains fields with confidence/value structure

type FieldValue = {
  confidence?: number;
  confidenceText?: string;
  value?: string;
  valueOriginal?: string;
  polygon?: number[][];
  pageIndex?: number;
};

// Dokumen Registrasi Pertama page fields
type DokumenRegistrasiPertamaFields = Partial<Record<
  | "namaApm"
  | "nomorFaktur"
  | "nomorFormAbc"
  | "tanggalFaktur",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Halaman Terakhir page fields
type HalamanTerakhirFields = Partial<Record<
  | "diterbitkanOleh"
  | "noRegister",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Identitas Kendaraan page fields
type IdentitasKendaraanFields = Partial<Record<
  | "bahanBakar"
  | "isiSilinder"
  | "jenis"
  | "jumlahRoda"
  | "jumlahSumbu"
  | "merk"
  | "model"
  | "nomorMesin"
  | "nomorRangka"
  | "nomorRegistrasi"
  | "tahunPembuatan"
  | "type"
  | "warna"
  | "warnaTnkb",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Identitas Pemilik page fields
type IdentitasPemilikFields = Partial<Record<
  | "alamat"
  | "alamatEmail"
  | "dikeluarkan"
  | "namaPemilik"
  | "noKtpTdp"
  | "noTelepon"
  | "nomorBpkb"
  | "padaTanggal"
  | "pekerjaan"
  | "stempelNomorBpkb",
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
