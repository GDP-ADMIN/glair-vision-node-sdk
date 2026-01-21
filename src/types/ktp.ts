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
  | "berlaku_hingga"
  | "golongan_darah"
  | "jenis_kelamin"
  | "foto"
  | "kecamatan"
  | "kelurahan_desa"
  | "kewarganegaraan"
  | "kota_kabupaten"
  | "nama"
  | "nik"
  | "pekerjaan"
  | "provinsi"
  | "rt_rw"
  | "status_perkawinan"
  | "tanggal_lahir"
  | "tempat_lahir"
  | "tanda_tangan";

type KTP_CONDITIONS =
  | "is_blurred"
  | "is_bright"
  | "is_copy"
  | "is_cropped"
  | "is_dark"
  | "is_flash"
  | "is_ktp"
  | "is_rotated";
