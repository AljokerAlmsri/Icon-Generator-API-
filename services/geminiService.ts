
import { IconConfig } from "../types";

export const generateIconImage = async (config: IconConfig): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...config,
        // إرسال المفتاح من البيئة إذا كان متاحاً في المتصفح (للعمل من داخل الموقع)
        apiKey: (process.env as any).API_KEY 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'فشل توليد الأيقونة');
    }

    return data.imageUrl;
  } catch (error: any) {
    console.error("Frontend Service Error:", error);
    throw error;
  }
};
