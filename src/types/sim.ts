// SIM has regular text fields and image fields
// Each field has confidence/value structure similar to KTP

type SIM_FIELDS =
  | "alamat"
  | "berlaku"
  | "golonganDarah"
  | "jenisKelamin"
  | "nama"
  | "nomorSim"
  | "pekerjaan"
  | "tanggalLahir"
  | "tempatLahir"
  | "tinggi"
  | "tipeSim"
  | "wilayah";

export type SIM = {
  images?: {
    foto?: string;
    tandaTangan?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<SIM_FIELDS, { confidence?: number; confidenceText?: string; value?: string; valueOriginal?: string; polygon?: number[][]; pageIndex?: number }>> & {
    [key: string]: { 
      confidence?: number;
      confidenceText?: string;
      value?: string;
      valueOriginal?: string;
      polygon?: number[][];
      pageIndex?: number;
    } | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};