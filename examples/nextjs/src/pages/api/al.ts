import { vision } from "@/util/vision";
import { apiHandler } from "@/util/api-handler";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await apiHandler(req, res, (filePath, fields) =>
    vision.faceBio.activeLiveness({
      image: filePath,
      gestureCode: fields.gestureCode as string,
    })
  );
}