
import React from 'react';
import { LayoutGrid, Box, Paintbrush, Layers, Zap, Shapes, Sparkles } from 'lucide-react';
import { IconStyle } from './types';

export const ICON_STYLES: { id: IconStyle; label: string; icon: React.ReactNode; prompt: string }[] = [
  { 
    id: 'minimalist', 
    label: 'بسيط (Minimalist)', 
    icon: <LayoutGrid size={20} />, 
    prompt: "Clean, simple, minimalist design with bold lines and limited elements." 
  },
  { 
    id: '3d', 
    label: 'ثلاثي الأبعاد (3D)', 
    icon: <Box size={20} />, 
    prompt: "Modern 3D render, depth, shadows, high detail, volumetric lighting." 
  },
  { 
    id: 'flat', 
    label: 'مسطح (Flat)', 
    icon: <Shapes size={20} />, 
    prompt: "Modern flat design, 2D graphics, clean aesthetics, vector style." 
  },
  { 
    id: 'gradient', 
    label: 'تدرج لوني (Gradient)', 
    icon: <Paintbrush size={20} />, 
    prompt: "Vibrant mesh gradients, smooth transitions, modern color palette." 
  },
  { 
    id: 'glassmorphism', 
    label: 'زجاجي (Glassmorphism)', 
    icon: <Layers size={20} />, 
    prompt: "Frosted glass effect, translucent layers, soft background blur." 
  },
  { 
    id: 'abstract', 
    label: 'تجريدي (Abstract)', 
    icon: <Sparkles size={20} />, 
    prompt: "Creative abstract shapes, conceptual representation, artistic flare." 
  },
  { 
    id: 'skeuomorphic', 
    label: 'واقعي (Skeuomorphic)', 
    icon: <Zap size={20} />, 
    prompt: "Realistic textures, mimic real-world materials, high detail." 
  },
];

export const COLOR_PRESETS = [
  { name: 'أزرق ملكي', value: '#2563eb' },
  { name: 'بنفسجي حديث', value: '#8b5cf6' },
  { name: 'أخضر زمردي', value: '#10b981' },
  { name: 'برتقالي مشرق', value: '#f59e0b' },
  { name: 'وردي أنيق', value: '#ec4899' },
  { name: 'رمادي فحمي', value: '#374151' },
  { name: 'توت أحمر', value: '#ef4444' },
  { name: 'أسود فخم', value: '#000000' },
];
