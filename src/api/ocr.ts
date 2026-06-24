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

type BaseOCRParam = { image: ImageSource };
type OCRParam = BaseOCRParam & { qualities_detector?: boolean };

export class Ocr {
  readonly ktpSessions: KtpSessions;
  readonly npwpSessions: NPWPSessions;

  constructor(private readonly config: Config) {
    this.ktpSessions = new KtpSessions(config);
    this.npwpSessions = new NPWPSessions(config);
  }

  async ktp(param: OCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KTP");
    return this.fetchOCR<KTP>(param, "ktp", newConfig, param.qualities_detector);
  }

  async npwp(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - NPWP");
    return this.fetchOCR<NPWP>(param, "npwp", newConfig);
  }

  async kk(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KK");
    return this.fetchOCR<KK>(param, "kk", newConfig);
  }

  async stnk(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - STNK");
    return this.fetchOCR<STNK>(param, "stnk", newConfig);
  }

  async bpkb(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - BPKB");
    return this.fetchOCR<BPKB>(param, "bpkb", newConfig);
  }

  async passport(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Passport");
    return this.fetchOCR<Passport>(param, "passport", newConfig);
  }

  async licensePlate(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - License Plate");
    return this.fetchOCR<Plate>(param, "plate", newConfig);
  }

  async generalDocument(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - General Document");
    return this.fetchOCR<GeneralDocument>(param, "general-document", newConfig);
  }

  async invoice(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Invoice");
    return this.fetchOCR<Invoice>(param, "invoice", newConfig);
  }

  async receipt(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Receipt");
    return this.fetchOCR<Receipt>(param, "receipt", newConfig);
  }

  async singaporeNRIC(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore NRIC");
    return this.fetchOCR<SingaporeNRIC>(param, "singapore-nric", newConfig);
  }

  async singaporeFamilyPass(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore Family Pass");
    return this.fetchOCR<SingaporeFamilyPass>(
      param,
      "singapore-family-pass",
      newConfig
    );
  }

  async singaporeWorkPermit(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Singapore Work Permit");
    return this.fetchOCR<SingaporeWorkPermit>(
      param,
      "singapore-work-permit",
      newConfig
    );
  }

    async sim(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - SIM");
    return this.fetchOCR<SIM>(param,"sim",newConfig);
  }

  async bankStatement(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Bank Statement");
    return this.fetchOCR<BankStatement>(param, "bank-statement", newConfig);
  }

  async bstk(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - BSTK");
    return this.fetchOCR<BSTK>(param, "bstk", newConfig);
  }

  async diploma(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Diploma");
    return this.fetchOCR<Diploma>(param, "diploma", newConfig);
  }

  async financialStatement(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Financial Statement");
    return this.fetchOCR<FinancialStatement>(param, "financial-statement", newConfig);
  }

  async kitasKitap(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - KITAS/KITAP");
    return this.fetchOCR<KitasKitap>(param, "kitas-kitap", newConfig);
  }

  async phonePackaging(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Phone Packaging");
    return this.fetchOCR<PhonePackaging>(param, "phone-packaging", newConfig);
  }

  async qualities(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Qualities");
    return this.fetchOCR<Qualities>(param, "qualities", newConfig);
  }

  async taxInvoice(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Tax Invoice");
    return this.fetchOCR<TaxInvoice>(param, "tax-invoice", newConfig);
  }

  async transcript(param: BaseOCRParam, newConfig?: Partial<Settings>) {
    logInfo("OCR - Transcript");
    return this.fetchOCR<Transcript>(param, "transcript", newConfig);
  }

  private async fetchOCR<T>(
    param: BaseOCRParam,
    endpoint: string,
    newConfig?: Partial<Settings>,
    qualities_detector = false
  ): Promise<T> {
    const validationResult = this.validateOCRParam(param);
    if (validationResult.length) {
      throw new Error(validationResult[0].message);
    }

    const { image } = param;

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

  private buildEndpoint(endpoint: string, qualities_detector = false): string {
    if (!qualities_detector) {
      return `ocr/:version/${endpoint}`;
    }
    return `ocr/:version/${endpoint}/qualities`;
  }

  validateOCRParam(param: BaseOCRParam) {
    const schema = {
      image: (val: any) => (isDefined(val) ? "" : "Image is required"),
    };

    return runSchemaValidation(param, schema);
  }
}
