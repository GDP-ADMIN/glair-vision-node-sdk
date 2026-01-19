export type KTP = {
  condition?: Partial<Record<KTP_CONDITIONS, boolean>> & {
    [key: string]: boolean | undefined;
  };
  images?: {
    photo?: string;
    sign?: string;
    [key: string]: string | undefined;
  };
  read?: Partial<Record<KTP_FIELDS, { confidence?: number; confidenceText?: string; value?: string; valueOriginal?: string; polygon?: number[][]; pageIndex?: number }>> & {
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
  form?: Partial<Record<KTP_FIELDS, string>> & {
    [key: string]: string | undefined;
  };
  reason?: string;
  [key: string]: unknown;
};

type KTP_FIELDS =
  | "agama"
  | "alamat"
  | "berlakuHingga"
  | "golonganDarah"
  | "jenisKelamin"
  | "kecamatan"
  | "kelurahanDesa"
  | "kewarganegaraan"
  | "kotaKabupaten"
  | "nama"
  | "nik"
  | "pekerjaan"
  | "provinsi"
  | "rtRw"
  | "statusPerkawinan"
  | "tanggalLahir"
  | "tempatLahir"
  | "tandaTangan";

type KTP_CONDITIONS =
  | "isBlurred"
  | "isBright"
  | "isCopy"
  | "isCropped"
  | "isDark"
  | "isFlash"
  | "isKtp"
  | "isRotated";
