import * as LocalAuthentication from 'expo-local-authentication';

// Check whether biometric security is available
export async function checkBiometricSupport() {
  try {
    const hardwareAvailable =
      await LocalAuthentication.hasHardwareAsync();

    const enrolled =
      await LocalAuthentication.isEnrolledAsync();

    return {
      available: hardwareAvailable && enrolled,
      hardwareAvailable,
      enrolled
    };
  } catch (error) {
    console.log('Biometric check error:', error);
    return {
      available: false,
      hardwareAvailable: false,
      enrolled: false
    };
  }
}

// Authenticate MYRA owner
export async function authenticateOwner() {
  try {
    const status = await checkBiometricSupport();

    if (!status.available) {
      return {
        success: false,
        message: 'ফিঙ্গারপ্রিন্ট বা বায়োমেট্রিক সেটআপ করা নেই।'
      };
    }

    const result =
      await LocalAuthentication.authenticateAsync({
        promptMessage: 'MYRA Owner Verification',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false
      });

    if (result.success) {
      return {
        success: true,
        message: 'Owner verified successfully.'
      };
    }

    return {
      success: false,
      message: 'Owner verification failed.'
    };

  } catch (error) {
    console.log('MYRA Security Error:', error);

    return {
      success: false,
      message: 'Security verification error.'
    };
  }
}
