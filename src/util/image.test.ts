import { describe, expect, it, vi } from "vitest";
import { getImageBlob } from "./image";
import { FileNotFoundError } from "../error/file-not-found";
import { existsSync, readFileSync } from "node:fs";

vi.mock("node:fs", () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
}));

describe("getImageBlob", () => {
  it("should return the source if it is already a Blob", async () => {
    const blob = new Blob(["test"], { type: "text/plain" });
    const result = await getImageBlob(blob);
    expect(result).toBe(blob);
  });

  it("should handle data URL (base64 with prefix)", async () => {
    const base64 = "YmFzZTY0ZGF0YQ=="; // "base64data"
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    const result = await getImageBlob(dataUrl);
    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("image/jpeg");
    const text = await result.text();
    expect(text).toBe("base64data");
  });

  it("should handle raw base64 string", async () => {
    const base64 = "YmFzZTY0ZGF0YQ=="; // "base64data"
    const result = await getImageBlob(base64);
    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("image/jpeg");
    const text = await result.text();
    expect(text).toBe("base64data");
  });

  it("should handle file path correctly", async () => {
    const filePath = "path/to/image.jpg";
    const fileContent = Buffer.from("filecontent");
    
    vi.mocked(existsSync).mockReturnValue(true);
    vi.mocked(readFileSync).mockReturnValue(fileContent);

    const result = await getImageBlob(filePath);
    expect(result).toBeInstanceOf(Blob);
    const text = await result.text();
    expect(text).toBe("filecontent");
    expect(existsSync).toHaveBeenCalledWith(filePath);
    expect(readFileSync).toHaveBeenCalledWith(filePath);
  });

  it("should throw FileNotFoundError if string is not base64 and not an existing file", async () => {
    const invalidSource = "invalid-source-that-is-not-base64-and-not-file";
    vi.mocked(existsSync).mockReturnValue(false);

    await expect(getImageBlob(invalidSource)).rejects.toThrow(FileNotFoundError);
  });

  it("should throw error for invalid source types", async () => {
    await expect(getImageBlob(123 as any)).rejects.toThrow("Invalid image source type");
  });
});
