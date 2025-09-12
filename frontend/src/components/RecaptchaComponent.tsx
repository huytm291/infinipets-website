import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyRecaptcha } from '../lib/supabaseClient'; 

interface RecaptchaComponentProps {
  siteKey: string; // Site key reCAPTCHA public từ Google
  onVerifySuccess: () => void; // Callback khi verify thành công
  onVerifyFail?: (error: string) => void; // Callback khi verify thất bại
}

export default function RecaptchaComponent({
  siteKey,
  onVerifySuccess,
  onVerifyFail,
}: RecaptchaComponentProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Hàm gọi khi reCAPTCHA trả về token
  const handleRecaptchaChange = async (token: string | null) => {
    if (!token) {
      setErrorMessage('reCAPTCHA token is null');
      onVerifyFail?.('reCAPTCHA token is null');
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const result = await verifyRecaptcha(token);
      // Giả sử Edge Function trả về { success: boolean, ... }
      if (result.success) {
        onVerifySuccess();
      } else {
        const err = result.error || 'reCAPTCHA verification failed';
        setErrorMessage(err);
        onVerifyFail?.(err);
        // Reset reCAPTCHA để người dùng thử lại
        recaptchaRef.current?.reset();
      }
    } catch (error: any) {
      const err = error.message || 'Error verifying reCAPTCHA';
      setErrorMessage(err);
      onVerifyFail?.(err);
      recaptchaRef.current?.reset();
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleRecaptchaChange}
        ref={recaptchaRef}
      />
      {isVerifying && <p className="text-sm text-blue-600">Verifying reCAPTCHA...</p>}
      {errorMessage && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
    </div>
  );
}