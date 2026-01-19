// KK-v2 has regular fields and a table array containing family member records
// Each field has confidence/value structure similar to KTP

type FieldValue = {
  confidence?: number;
  confidenceText?: string;
  value?: string;
  valueOriginal?: string;
  polygon?: number[][];
  pageIndex?: number;
};

// Regular KK fields
type KK_FIELDS =
  | "alamat"
  | "desaKelurahan"
  | "kabupatenKota"
  | "kecamatan"
  | "kodePos"
  | "namaKepalaKeluarga"
  | "nomorBlanko"
  | "nomorKk"
  | "provinsi"
  | "rtRw"
  | "tanggalDikeluarkan";

// Table fields (for family members)
type KK_TABLE_FIELDS =
  | "agama"
  | "golonganDarah"
  | "jenisKelamin"
  | "jenisPekerjaan"
  | "kewarganegaraan"
  | "namaAyah"
  | "namaIbu"
  | "namaLengkap"
  | "nik"
  | "no"
  | "noKitasKitap"
  | "noPaspor"
  | "pendidikan"
  | "statusHubunganDalamKeluarga"
  | "statusPerkawinan"
  | "tanggalLahir"
  | "tanggalPerkawinan"
  | "tempatLahir";

// Table row type (each family member)
type KKTableRow = Partial<Record<KK_TABLE_FIELDS, FieldValue>> & {
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
