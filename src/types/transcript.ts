import type { FieldValue } from "./common";

type TRANSCRIPT_FIELDS =
  | "student_name"
  | "institution"
  | "faculty"
  | "major"
  | "gpa"
  | "education_level";

export type Transcript = {
  read?: Partial<Record<TRANSCRIPT_FIELDS, FieldValue>> & {
    [key: string]: FieldValue | undefined;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};
