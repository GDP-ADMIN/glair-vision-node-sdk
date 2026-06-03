type QualityBooleanField = {
  confidence?: number;
  value?: boolean;
};

type BlurField = QualityBooleanField & {
  confidence_blur?: number;
};

type BrightField = QualityBooleanField & {
  confidence_bright?: number;
};

type CropField = QualityBooleanField & {
  confidence_crop?: number;
};

type DarkField = QualityBooleanField & {
  confidence_dark?: number;
};

type FlashField = QualityBooleanField & {
  confidence_flash?: number;
};

type PhotocopyField = QualityBooleanField & {
  confidence_photocopy?: number;
};

type ScreenField = QualityBooleanField & {
  confidence_screen?: number;
};

type DocumentField = {
  confidence?: number;
  value?: string;
};

type RotateField = {
  confidence?: number;
  value?: string;
  fixed_image?: string;
};

export type Qualities = {
  read?: {
    blur?: BlurField;
    bright?: BrightField;
    crop?: CropField;
    dark?: DarkField;
    document?: DocumentField;
    flash?: FlashField;
    photocopy?: PhotocopyField;
    rotate?: RotateField;
    screen?: ScreenField;
  };
  status?: string;
  reason?: string;
  [key: string]: unknown;
};