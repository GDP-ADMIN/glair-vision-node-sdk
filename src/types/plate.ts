type PLATE_FIELDS =
  | "plates"

export type Plate = {
  read?: Partial<Record<PLATE_FIELDS, string | undefined>> & {
    [key: string]: string | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};