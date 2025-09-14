import { useRef, useCallback } from 'react';
import RecaptchaWrapper, { RecaptchaWrapperRef } from '@/components/RecaptchaWrapper';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const RECAPTCHA_VERIFY_FUNCTION_URL = 'https://qrhtnntsdfsgzfkhohzp.supabase.co/functions/v1/verify-recaptcha';

interface UseRecaptchaReturn {
  recaptchaRef: React.RefObject<RecaptchaWrapperRef>;
  verifyRecaptcha: () => Promise<{ success: boolean; error?: string }>;
  RecaptchaComponent: React.ComponentType;
  isConfigured: boolean;
}

export const useRecaptcha = (): UseRecaptchaReturn => {
  const recaptchaRef = useRef<RecaptchaWrapperRef>(null);

  const verifyRecaptcha = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    // Check if reCAPTCHA is configured
    if (!RECAPTCHA_SITE_KEY) {
      console.warn('reCAPTCHA site key not configured, skipping verification');
      return { success: true }; // Allow to proceed without reCAPTCHA in development
    }

    try {
      // Execute reCAPTCHA
      const token = await recaptchaRef.current?.executeAsync();
      
      if (!token) {
        return { 
          success: false, 
          error: 'reCAPTCHA verification failed. Please try again.' 
        };
      }

      // Reset reCAPTCHA for next use
      recaptchaRef.current?.reset();

      // Verify token with backend
      const verifyResponse = await fetch(RECAPTCHA_VERIFY_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyResponse.ok) {
        return { 
          success: false, 
          error: 'Failed to verify reCAPTCHA. Please try again.' 
        };
      }

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        return { 
          success: false, 
          error: 'reCAPTCHA verification failed. Please try again.' 
        };
      }

      return { success: true };

    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return { 
        success: false, 
        error: 'An error occurred during verification. Please try again.' 
      };
    }
  }, []);

  const RecaptchaComponent = useCallback(() => {
    return RecaptchaWrapper({ 
      ref: recaptchaRef, 
      siteKey: RECAPTCHA_SITE_KEY,
      size: 'invisible'
    });
  }, []);

  return {
    recaptchaRef,
    verifyRecaptcha,
    RecaptchaComponent,
    isConfigured: !!RECAPTCHA_SITE_KEY
  };
};