import { vision } from "@/util/vision";
import { apiHandler } from "@/util/api-handler";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await apiHandler(req, res, (filePath, fields) =>
    vision.ocr.npwp({
      image: filePath,
      qualities_detector: fields.qualities_detector?.[0] === "true",
    })
  );
}