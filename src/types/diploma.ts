import type { FieldValue } from "./common";

type DIPLOMA_FIELDS =
  | "student_name"
  | "student_number"
  | "student_birth_place_date"
  | "ijazah_number"
  | "institutions"
  | "study_program"
  | "graduate_date"
  | "educational_level"
  | "educational_degree";

export type Diploma = {
  read?: Partial<Record<DIPLOMA_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
