type PLATE_FIELDS =
  | "plates"

type PLATE_VALUE = {
  text?: string;
}

export type Plate = {
  read?: Partial<Record<PLATE_FIELDS, PLATE_VALUE[] | undefined>> & {
    [key: string]: PLATE_VALUE[] | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
