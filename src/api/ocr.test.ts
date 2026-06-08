// ocr.test.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import { Ocr } from "./ocr";
import { Config, Settings } from "./config";
import { visionFetch } from "../util/visionFetch";
import { getImageBlob } from "../util/image";
import { logInfo } from "../util/logger";

vi.mock("../util/visionFetch");
vi.mock("../util/image");
vi.mock("../util/logger");
vi.mock("./sessions/ktpSessions");
vi.mock("./sessions/npwpSessions");

const mockVisionFetch = vi.mocked(visionFetch);
const mockGetImageBlob = vi.mocked(getImageBlob);

describe("Ocr", () => {
  let ocr: Ocr;
  let mockConfig: { getConfig: ReturnType<typeof vi.fn> };
  const mockConfigValue = { baseUrl: "https://api.example.com", version: "v1" };
  const mockBlob = new Blob(["image-data"], { type: "image/jpeg" });
  const mockImage = "data:image/jpeg;base64,abc123";
  const mockParam = { image: mockImage };

  beforeEach(() => {
    vi.clearAllMocks();

    mockConfig = {
      getConfig: vi.fn().mockReturnValue(mockConfigValue),
    };

    mockGetImageBlob.mockResolvedValue(mockBlob);
    mockVisionFetch.mockResolvedValue({ success: true });

    ocr = new Ocr(mockConfig as unknown as Config);
  });

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────
  describe("constructor", () => {
    it("should instantiate ktpSessions and npwpSessions", () => {
      expect(ocr.ktpSessions).toBeDefined();
      expect(ocr.npwpSessions).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────
  // validateOCRParam
  // ─────────────────────────────────────────────
  describe("validateOCRParam", () => {
    it("should return no errors when image is provided", () => {
      const result = ocr.validateOCRParam({ image: mockImage });
      expect(result).toHaveLength(0);
    });

    it("should return an error when image is undefined", () => {
      const result = ocr.validateOCRParam({ image: undefined as any });
      expect(result).toHaveLength(1);
      expect(result[0].message).toBe("Image is required");
    });

    it("should return no errors when image is null (null is considered defined)", () => {
      const result = ocr.validateOCRParam({ image: null as any });
      expect(result).toHaveLength(0);
    });
  });

  // ─────────────────────────────────────────────
  // buildEndpoint (via fetchOCR behavior)
  // ─────────────────────────────────────────────
  describe("buildEndpoint", () => {
    it("should use base endpoint when qualities_detector is false", async () => {
      await ocr.ktp({ image: mockImage, qualities_detector: false });
      expect(mockVisionFetch).toHaveBeenCalledWith(
        mockConfigValue,
        "ocr/:version/ktp",
        expect.any(Object)
      );
    });

    it("should use base endpoint when qualities_detector is undefined", async () => {
      await ocr.ktp({ image: mockImage });
      expect(mockVisionFetch).toHaveBeenCalledWith(
        mockConfigValue,
        "ocr/:version/ktp",
        expect.any(Object)
      );
    });

    it("should append /qualities when qualities_detector is true", async () => {
      await ocr.ktp({ image: mockImage, qualities_detector: true });
      expect(mockVisionFetch).toHaveBeenCalledWith(
        mockConfigValue,
        "ocr/:version/ktp/qualities",
        expect.any(Object)
      );
    });

    it("should NOT append /qualities for qualities endpoint even if qualities_detector is true", async () => {
      await ocr.qualities({ image: mockImage, qualities_detector: true });
      expect(mockVisionFetch).toHaveBeenCalledWith(
        mockConfigValue,
        "ocr/:version/qualities",
        expect.any(Object)
      );
    });
  });

  // ─────────────────────────────────────────────
  // fetchOCR - shared behavior
  // ─────────────────────────────────────────────
  describe("fetchOCR shared behavior", () => {
    it("should throw an error when image is missing", async () => {
      await expect(ocr.ktp({ image: undefined as any })).rejects.toThrow(
        "Image is required"
      );
    });

    it("should call getImageBlob with the provided image", async () => {
      await ocr.ktp(mockParam);
      expect(mockGetImageBlob).toHaveBeenCalledWith(mockImage);
    });

    it("should call config.getConfig with newConfig when provided", async () => {
      const newConfig: Partial<Settings> = { baseUrl: "https://other.api.com" };
      await ocr.ktp(mockParam, newConfig);
      expect(mockConfig.getConfig).toHaveBeenCalledWith(newConfig);
    });

    it("should build FormData with the image blob", async () => {
      const formDataSetSpy = vi.spyOn(FormData.prototype, "set");
      await ocr.ktp(mockParam);
      expect(formDataSetSpy).toHaveBeenCalledWith("image", mockBlob, "filename.jpg");
    });

    it("should call visionFetch with POST method", async () => {
      await ocr.ktp(mockParam);
      expect(mockVisionFetch).toHaveBeenCalledWith(
        mockConfigValue,
        expect.any(String),
        expect.objectContaining({ method: "POST" })
      );
    });

    it("should return the result from visionFetch", async () => {
      const mockResult = { nik: "1234567890" };
      mockVisionFetch.mockResolvedValueOnce(mockResult);
      const result = await ocr.ktp(mockParam);
      expect(result).toEqual(mockResult);
    });
  });

  // ─────────────────────────────────────────────
  // Individual OCR methods
  // ─────────────────────────────────────────────
  const ocrMethods: Array<{
    method: keyof Ocr;
    label: string;
    endpoint: string;
  }> = [
    { method: "ktp", label: "OCR - KTP", endpoint: "ocr/:version/ktp" },
    { method: "npwp", label: "OCR - NPWP", endpoint: "ocr/:version/npwp" },
    { method: "kk", label: "OCR - KK", endpoint: "ocr/:version/kk" },
    { method: "stnk", label: "OCR - STNK", endpoint: "ocr/:version/stnk" },
    { method: "bpkb", label: "OCR - BPKB", endpoint: "ocr/:version/bpkb" },
    { method: "passport", label: "OCR - Passport", endpoint: "ocr/:version/passport" },
    { method: "licensePlate", label: "OCR - License Plate", endpoint: "ocr/:version/plate" },
    { method: "generalDocument", label: "OCR - General Document", endpoint: "ocr/:version/general-document" },
    { method: "invoice", label: "OCR - Invoice", endpoint: "ocr/:version/invoice" },
    { method: "receipt", label: "OCR - Receipt", endpoint: "ocr/:version/receipt" },
    { method: "singaporeNRIC", label: "OCR - Singapore NRIC", endpoint: "ocr/:version/singapore-nric" },
    { method: "singaporeFamilyPass", label: "OCR - Singapore Family Pass", endpoint: "ocr/:version/singapore-family-pass" },
    { method: "singaporeWorkPermit", label: "OCR - Singapore Work Permit", endpoint: "ocr/:version/singapore-work-permit" },
    { method: "sim", label: "OCR - SIM", endpoint: "ocr/:version/sim" },
    { method: "bankStatement", label: "OCR - Bank Statement", endpoint: "ocr/:version/bank-statement" },
    { method: "bstk", label: "OCR - BSTK", endpoint: "ocr/:version/bstk" },
    { method: "diploma", label: "OCR - Diploma", endpoint: "ocr/:version/diploma" },
    { method: "financialStatement", label: "OCR - Financial Statement", endpoint: "ocr/:version/financial-statement" },
    { method: "kitasKitap", label: "OCR - KITAS/KITAP", endpoint: "ocr/:version/kitas-kitap" },
    { method: "phonePackaging", label: "OCR - Phone Packaging", endpoint: "ocr/:version/phone-packaging" },
    { method: "skpr", label: "OCR - SKPR", endpoint: "ocr/:version/skpr" },
    { method: "spk", label: "OCR - SPK", endpoint: "ocr/:version/spk" },
    { method: "qualities", label: "OCR - Qualities", endpoint: "ocr/:version/qualities" },
    { method: "taxInvoice", label: "OCR - Tax Invoice", endpoint: "ocr/:version/tax-invoice" },
    { method: "transcript", label: "OCR - Transcript", endpoint: "ocr/:version/transcript" },
  ];

  describe.each(ocrMethods)("$method", ({ method, label, endpoint }) => {
    it(`should log "${label}"`, async () => {
      await (ocr[method] as Function)(mockParam);
      expect(logInfo).toHaveBeenCalledWith(label);
    });

    it(`should call visionFetch with endpoint "${endpoint}"`, async () => {
      await (ocr[method] as Function)(mockParam);
      expect(mockVisionFetch).toHaveBeenCalledWith(
        mockConfigValue,
        endpoint,
        expect.any(Object)
      );
    });

    it("should throw when image is missing", async () => {
      await expect(
        (ocr[method] as Function)({ image: undefined })
      ).rejects.toThrow("Image is required");
    });
  });
});
