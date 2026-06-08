import formidable from "formidable";
import type { NextApiRequest } from "next";

export type ParsedForm = {
  fields: formidable.Fields;
  files: formidable.Files;
};

export function parseForm(req: NextApiRequest): Promise<ParsedForm> {
  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject("request body parse error");
      }
      resolve({ fields, files });
    });
  });
}