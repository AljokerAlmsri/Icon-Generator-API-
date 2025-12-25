
export type IconStyle = 'minimalist' | '3d' | 'flat' | 'gradient' | 'glassmorphism' | 'skeuomorphic' | 'abstract';

export interface IconConfig {
  appName: string;
  description: string;
  style: IconStyle;
  primaryColor: string;
}

export interface GeneratedIcon {
  id: string;
  url: string;
  config: IconConfig;
  createdAt: number;
}
