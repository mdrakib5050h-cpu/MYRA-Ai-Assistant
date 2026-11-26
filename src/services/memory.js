import AsyncStorage from '@react-native-async-storage/async-storage';

const MEMORY_KEY = 'MYRA_MEMORY';

export async function saveMemory(message) {
  try {
    const oldData = await getMemories();

    oldData.push({
      id: Date.now().toString(),
      message: message,
      date: new Date().toISOString()
    });

    await AsyncStorage.setItem(
      MEMORY_KEY,
      JSON.stringify(oldData)
    );

    return true;
  } catch (error) {
    console.log('Memory error:', error);
    return false;
  }
}

export async function getMemories() {
  try {
    const data = await AsyncStorage.getItem(MEMORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

export async function clearMemories() {
  await AsyncStorage.removeItem(MEMORY_KEY);
}
