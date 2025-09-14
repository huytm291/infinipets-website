import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaWrapperProps {
  siteKey?: string;
  onVerify?: (token: string | null) => void;
  onError?: (error: any) => void;
  size?: 'compact' | 'normal' | 'invisible';
  theme?: 'light' | 'dark';
}

export interface RecaptchaWrapperRef {
  executeAsync: () => Promise<string | null>;
  reset: () => void;
  getResponse: () => string | null;
}

const RecaptchaWrapper = forwardRef<RecaptchaWrapperRef, RecaptchaWrapperProps>(
  ({ siteKey, onVerify, onError, size = 'invisible', theme = 'light' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useImperativeHandle(ref, () => ({
      executeAsync: async (): Promise<string | null> => {
        if (!siteKey) {
          console.warn('reCAPTCHA site key not configured');
          return null;
        }
        
        if (!isLoaded) {
          console.warn('reCAPTCHA not loaded yet');
          return null;
        }

        try {
          const token = await recaptchaRef.current?.executeAsync();
          return token || null;
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error);
          onError?.(error);
          return null;
        }
      },
      reset: () => {
        recaptchaRef.current?.reset();
      },
      getResponse: () => {
        return recaptchaRef.current?.getValue() || null;
      }
    }));

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = (error: any) => {
      console.error('reCAPTCHA error:', error);
      onError?.(error);
    };

    const handleChange = (token: string | null) => {
      onVerify?.(token);
    };

    // Don't render if no site key
    if (!siteKey) {
      return null;
    }

    return (
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        size={size}
        theme={theme}
        onLoad={handleLoad}
        onError={handleError}
        onChange={handleChange}
      />
    );
  }
);

RecaptchaWrapper.displayName = 'RecaptchaWrapper';

export default RecaptchaWrapper;