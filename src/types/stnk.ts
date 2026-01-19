// STNK-v2 has a nested structure with multiple pages/sections
// Each page contains fields with confidence/value structure

type FieldValue = {
  confidence?: number;
  confidenceText?: string;
  value?: string;
  valueOriginal?: string;
  polygon?: number[][];
  pageIndex?: number;
};

// Halaman STNK page fields
type HalamanStnkFields = Partial<Record<
  | "alamat"
  | "bahanBakar"
  | "berlakuSampai"
  | "isiSilinder"
  | "jenis"
  | "kodeLokasi"
  | "merk"
  | "model"
  | "namaPemilik"
  | "nomorBpkb"
  | "nomorIdentitasPemilik"
  | "nomorMesin"
  | "nomorRangka"
  | "nomorRegistrasi"
  | "nomorStnk"
  | "nomorUrutPendaftaran"
  | "poldaPenerbitan"
  | "tahunPembuatan"
  | "tahunRegistrasi"
  | "tanggalPenerbitan"
  | "tempatPenerbitan"
  | "tipe"
  | "warna"
  | "warnaTnkb",
  FieldValue
>> & {
  [key: string]: FieldValue | undefined;
};

// Halaman Pajak Tahunan page fields
type HalamanPajakTahunanFields = Partial<Record<
  | "alamat"
  | "bahanBakar"
  | "berlakuSampai"
  | "ditetapkanTanggal"
  | "ident"
  | "isiSilinder"
  | "jenis"
  | "jumlahSumbu"
  | "kepemilikanKe"
  | "kodeNjkb"
  | "merk"
  | "model"
  | "namaPemilik"
  | "nomorBpkb"
  | "nomorIdentitasPemilik"
  | "nomorMesin"
  | "nomorPajakTahunan"
  | "nomorRangka"
  | "nomorRegistrasi"
  | "nomorRegistrasiLama"
  | "samsatProvinsi"
  | "tahunPembuatan"
  | "tahunRegistrasi"
  | "tipe"
  | "warna"
  | "warnaTnkb",
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
