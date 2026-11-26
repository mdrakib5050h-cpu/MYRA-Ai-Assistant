import { Platform } from 'react-native';

export async function speak(text) {
  try {
    if (Platform.OS === 'web') {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      const Speech = require('expo-speech');
      await Speech.speak(text, {
        language: 'bn-BD',
        rate: 0.9,
      });
    }
  } catch (error) {
    console.log('Voice error:', error);
  }
}
