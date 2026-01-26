import { readFileSync } from "fs";
import { logInfo } from "../util/logger";
import { visionFetch } from "../util/visionFetch";
import { Config, Settings } from "./config";
import { PassiveLivenessSessions } from "./sessions/passiveLivenessSessions";
import { ActiveLivenessSessions } from "./sessions/activeLivenessSessions";


import { ImageSource } from "../types/image";
import { getImageBlob } from "../util/image";

type MatchParam = { captured: ImageSource; stored: ImageSource };
type PassiveLivenessParam = { image: ImageSource };
type ActiveLivenessParam = { image: ImageSource; gestureCode: string };

export class FaceBio {
  readonly passiveLivenessSessions: PassiveLivenessSessions;
  readonly activeLivenessSessions: ActiveLivenessSessions;

  constructor(private readonly config: Config) {
    this.passiveLivenessSessions = new PassiveLivenessSessions(config);
    this.activeLivenessSessions = new ActiveLivenessSessions(config);
  }

  async match(param: MatchParam, newConfig?: Partial<Settings>) {
    logInfo("Face Biometric - Match", { param });
    const { captured, stored } = param;

    const formData = new FormData();
    formData.set("captured_image", await getImageBlob(captured));
    formData.set("stored_image", await getImageBlob(stored));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/match", req);
  }

  async passiveLiveness(
    param: PassiveLivenessParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Face Biometric - Passive Liveness", { param });
    const { image } = param;

    const formData = new FormData();
    formData.set("image", await getImageBlob(image));

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/passive-liveness", req);
  }

  async activeLiveness(
    param: ActiveLivenessParam,
    newConfig?: Partial<Settings>
  ) {
    logInfo("Face Biometric - Active Liveness", { param });
    const { image, gestureCode } = param;

    const formData = new FormData();
    formData.set("image", await getImageBlob(image));
    formData.set("gesture-code", gestureCode);

    const req = {
      method: "POST",
      body: formData,
    };

    const config = this.config.getConfig(newConfig);
    return visionFetch(config, "face/:version/active-liveness", req);
  }

  base64_encode(file: string) {
    const bitmap = readFileSync(file);
    return bitmap.toString("base64");
  }
}
