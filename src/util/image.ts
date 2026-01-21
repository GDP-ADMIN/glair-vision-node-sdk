import { existsSync, readFileSync } from "node:fs";
import { FileNotFoundError } from "../error/file-not-found";
import { ImageSource } from "../types/image";

/**
 * Converts various image sources to a Blob.
 * 
 * @param source The image source (file path, base64 string, Blob, or File)
 * @returns A Promise that resolves to a Blob
 */
export async function getImageBlob(source: ImageSource): Promise<Blob> {
  if (source instanceof Blob) {
    return source;
  }

  if (typeof source === "string") {
    // Check if it's a data URL
    if (source.startsWith("data:")) {
      const parts = source.split(",");
      if (parts.length < 2) {
        throw new Error("Invalid base64 data URL");
      }
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const buffer = Buffer.from(parts[1], "base64");
      return new Blob([buffer as any], { type: mime });
    }

    // Check if it's a file path
    if (existsSync(source)) {
      const buffer = readFileSync(source);
      return new Blob([buffer as any]);
    }

    // Check if it's a raw base64 string (no prefix)
    // Base64 strings usually have a length that is a multiple of 4
    if (source.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(source)) {
      try {
        const buffer = Buffer.from(source, "base64");
        return new Blob([buffer as any], { type: "image/jpeg" });
      } catch (e) {
        // Fall through to FileNotFoundError
      }
    }

    throw new FileNotFoundError(source);
  }

  throw new Error("Invalid image source type");
}
