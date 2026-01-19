// NPWP has regular text fields
// Each field has confidence/value structure similar to KTP

type NPWP_FIELDS = "noNpwp" | "nik" | "nama" | "alamat";

export type NPWP = {
  read?: Partial<Record<NPWP_FIELDS, { confidence?: number; confidenceText?: string; value?: string; valueOriginal?: string; polygon?: number[][]; pageIndex?: number }>> & {
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
