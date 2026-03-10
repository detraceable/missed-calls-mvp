'use server';

import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateBusinessSettings(
  businessId: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const systemPrompt = formData.get('systemPrompt') as string || '';
    const isActive = formData.get('isActive') === 'on';

    if (!businessId || !systemPrompt.trim()) {
      return { success: false, error: 'Invalid business ID or empty system prompt.' };
    }

    const db = getDb();
    if (!db) {
      return { success: false, error: 'Database connection failed.' };
    }

    await db`
      UPDATE businesses
      SET 
        is_active = ${isActive},
        default_system_prompt = ${systemPrompt.trim()}
      WHERE id = ${businessId}
    `;

    // Revalidate the dashboard paths to reflect the new data instantly
    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard/conversations');

    return { success: true };
  } catch (err: any) {
    console.error('[Action: updateBusinessSettings] Failed:', err);
    return { success: false, error: err.message || 'An unknown error occurred.' };
  }
}
