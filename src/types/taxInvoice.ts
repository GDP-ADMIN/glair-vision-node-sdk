import type { FieldValue } from "./common";

type TAX_INVOICE_FIELDS =
  | "nomor_faktur"
  | "nama_pengusaha"
  | "alamat_pengusaha"
  | "npwp_pengusaha"
  | "nama_pembeli"
  | "alamat_pembeli"
  | "npwp_pembeli"
  | "nama_barang_jasa_1"
  | "harga_jual_1"
  | "harga_jual_penggantian"
  | "potongan_harga"
  | "uang_muka"
  | "dasar_pengenaan_pajak"
  | "total_ppn"
  | "total_ppnbm"
  | "tanggal_faktur"
  | "nomor_invoice";

export type TaxInvoice = {
  read?: Partial<Record<TAX_INVOICE_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};