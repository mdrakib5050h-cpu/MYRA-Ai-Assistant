import { askGemini } from './gemini';
import { speak } from './voice';

export async function talkToMyra(message, apiKey) {
  try {
    const reply = await askGemini(message, apiKey);

    await speak(reply);

    return reply;
  } catch (error) {
    console.log('MYRA Error:', error);
    return 'দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না।';
  }
}
