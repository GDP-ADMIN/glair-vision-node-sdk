import { Config, Settings } from "./config";

import { KtpSessions } from "./sessions/ktpSessions";
import { NPWPSessions } from "./sessions/npwpSessions";

import { logInfo } from "../util/logger";
import { isDefined, runSchemaValidation } from "../util/validator";
import { visionFetch } from "../util/visionFetch";


import type { KTP } from "../types/ktp";
import type { NPWP } from "../types/npwp";
import type { GeneralDocument } from "../types/generalDocument";
import type { BPKB } from "../types/bpkb";
import type { KK } from "../types/kk";
import type { STNK } from "../types/stnk";
import type { Passport } from "../types/passport";
import type { Invoice } from "../types/invoice";
import type { Receipt } from "../types/receipt";
import type { SingaporeNRIC } from "../types/singaporeNRIC";
import type { SingaporeFamilyPass } from "../types/singaporeFamilyPass";
import type { SingaporeWorkPermit } from "../types/singaporeWorkPermit";
import type { SIM } from "../types/sim";
import type { Plate } from "../types/plate";
import type { BankStatement } from "../types/bankStatement";
import type { BSTK } from "../types/bstk";
import type { Diploma } from "../types/diploma";
import type { FinancialStatement } from "../types/financialStatement";
import type { KitasKitap } from "../types/kitasKitap";
import type { PhonePackaging } from "../types/phonePackaging";
import type { Qualities } from "../types/qualities";
import type { TaxInvoice } from "../types/taxInvoice";
import type { Transcript } from "../types/transcript";
import { ImageSource } from "../types/image";
import { getImageBlob } from "../util/image";

type OCRParam = { image: ImageSource; qualities_detector?: boolean };

export class Ocr {
  readonly ktpSessions: KtpSessions;
  readonly npwpSessions: NPWPSessions;

  constructor(private readonly config: Config) {
    this.ktpSessions = new KtpSessions(config);
    this.npwpSessions = new NPWPSessions(config);
  }

  async ktp<T = KTP>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KTP");
    return this.fetchOCR<T>(param, "ktp", newConfig);
  }

  async npwp<T = NPWP>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - NPWP");
    return this.fetchOCR<T>(param, "npwp", newConfig);
  }

  async kk<T = KK>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KK");
    return this.fetchOCR<T>(param, "kk", newConfig);
  }

  async stnk<T = STNK>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - STNK");
    return this.fetchOCR<T>(param, "stnk", newConfig);
  }

  async bpkb<T = BPKB>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - BPKB");
    return this.fetchOCR<T>(param, "bpkb", newConfig);
  }

  async passport<T = Passport>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Passport");
    return this.fetchOCR<T>(param, "passport", newConfig);
  }

  async licensePlate<T = Plate>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - License Plate");
    return this.fetchOCR<T>(param, "plate", newConfig);
  }

  async generalDocument<T = GeneralDocument>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - General Document");
    return this.fetchOCR<T>(param, "general-document", newConfig);
  }

  async invoice<T = Invoice>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Invoice");
    return this.fetchOCR<T>(param, "invoice", newConfig);
  }

  async receipt<T = Receipt>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Receipt");
    return this.fetchOCR<T>(param, "receipt", newConfig);
  }

  async singaporeNRIC<T = SingaporeNRIC>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore NRIC");
    return this.fetchOCR<T>(param, "singapore-nric", newConfig);
  }

  async singaporeFamilyPass<T = SingaporeFamilyPass>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore Family Pass");
    return this.fetchOCR<T>(
      param,
      "singapore-family-pass",
      newConfig
    );
  }

  async singaporeWorkPermit<T = SingaporeWorkPermit>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore Work Permit");
    return this.fetchOCR<T>(
      param,
      "singapore-work-permit",
      newConfig
    );
  }

    async sim<T = SIM>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - SIM");
    return this.fetchOCR<T>(param,"sim",newConfig);
  }

  async bankStatement<T = BankStatement>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Bank Statement");
    return this.fetchOCR<T>(param, "bank-statement", newConfig);
  }

  async bstk<T = BSTK>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - BSTK");
    return this.fetchOCR<T>(param, "bstk", newConfig);
  }

  async diploma<T = Diploma>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Diploma");
    return this.fetchOCR<T>(param, "diploma", newConfig);
  }

  async financialStatement<T = FinancialStatement>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Financial Statement");
    return this.fetchOCR<T>(param, "financial-statement", newConfig);
  }

  async kitasKitap<T = KitasKitap>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KITAS/KITAP");
    return this.fetchOCR<T>(param, "kitas-kitap", newConfig);
  }

  async phonePackaging<T = PhonePackaging>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Phone Packaging");
    return this.fetchOCR<T>(param, "phone-packaging", newConfig);
  }

  async qualities<T = Qualities>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Qualities");
    return this.fetchOCR<T>(param, "qualities", newConfig);
  }

  async taxInvoice<T = TaxInvoice>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Tax Invoice");
    return this.fetchOCR<T>(param, "tax-invoice", newConfig);
  }

  async transcript<T = Transcript>(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Transcript");
    return this.fetchOCR<T>(param, "transcript", newConfig);
  }

  private async fetchOCR<T>(
    param: OCRParam,
    endpoint: string,
    newConfig?: Partial<Settings>
  ): Promise<T> {
    const validationResult = this.validateOCRParam(param);
    if (validationResult.length) {
      throw new Error(validationResult[0].message);
    }

    const { image, qualities_detector } = param;

    const formData = new FormData();
    formData.set(
      "image",
      await getImageBlob(image),
      "filename.jpg"
    );

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(
      config,
      this.buildEndpoint(endpoint, qualities_detector),
      req
    );
  }

  private buildEndpoint(endpoint: string, qualities_detector?: boolean): string {
    if (!qualities_detector || endpoint === "qualities") {
      return `ocr/:version/${endpoint}`;
    }
    return `ocr/:version/${endpoint}/qualities`;
  }

  validateOCRParam(param: OCRParam) {
    const schema = {
      image: (val: any) => (isDefined(val) ? "" : "Image is required"),
    };

    return runSchemaValidation(param, schema);
  }
}
