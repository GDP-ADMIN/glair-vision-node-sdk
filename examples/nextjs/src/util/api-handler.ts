import { parseForm } from "./parse-form";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

type ApiCallback = (filePath: string, fields: formidable.Fields) => Promise<unknown>;

export async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: ApiCallback
) {
  const result = await parseForm(req).catch((err) => {
    res.status(400).json({ error: err });
    return null;
  });

  if (!result) return;

  const filePath = (result.files.image as formidable.File[])[0].filepath;

  let error = null;
  const resp = await callback(filePath, result.fields).catch((err) => (error = err));

  if (error) return res.status(400).json(error);
  res.status(200).json(resp);
}