export type QualityBooleanField = {
  confidence?: number;
  value?: boolean;
};

export type BlurField = QualityBooleanField & {
  confidence_blur?: number;
};

export type BrightField = QualityBooleanField & {
  confidence_bright?: number;
};

export type CropField = QualityBooleanField & {
  confidence_crop?: number;
};

export type DarkField = QualityBooleanField & {
  confidence_dark?: number;
};

export type FlashField = QualityBooleanField & {
  confidence_flash?: number;
};

export type PhotocopyField = QualityBooleanField & {
  confidence_photocopy?: number;
};

export type ScreenField = QualityBooleanField & {
  confidence_screen?: number;
};

export type DocumentField = {
  confidence?: number;
  value?: string;
};

export type RotateField = {
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
