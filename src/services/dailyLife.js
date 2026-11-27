import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  routines: 'MYRA_ROUTINES',
  alarms: 'MYRA_ALARMS',
  sleep: 'MYRA_SLEEP_REMINDERS',
  birthdays: 'MYRA_BIRTHDAYS',
  shopping: 'MYRA_SHOPPING_LIST',
  planner: 'MYRA_DAILY_PLANNER',
};

async function getItems(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('MYRA read error:', error);
    return [];
  }
}

async function saveItems(key, items) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(items));
    return true;
  } catch (error) {
    console.log('MYRA save error:', error);
    return false;
  }
}

async function addItem(key, item) {
  const items = await getItems(key);
  const newItem = {
    id: Date.now().toString(),
    ...item,
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  const success = await saveItems(key, items);
  return success ? newItem : null;
}

export const addRoutine = item => addItem(KEYS.routines, item);
export const getRoutines = () => getItems(KEYS.routines);

export const addAlarm = item => addItem(KEYS.alarms, item);
export const getAlarms = () => getItems(KEYS.alarms);

export const addSleepReminder = item => addItem(KEYS.sleep, item);
export const getSleepReminders = () => getItems(KEYS.sleep);

export const addBirthday = item => addItem(KEYS.birthdays, item);
export const getBirthdays = () => getItems(KEYS.birthdays);

export const addShoppingItem = item => addItem(KEYS.shopping, item);
export const getShoppingList = () => getItems(KEYS.shopping);

export const addPlannerTask = item => addItem(KEYS.planner, item);
export const getPlannerTasks = () => getItems(KEYS.planner);

export async function deleteItem(keyName, id) {
  const key = KEYS[keyName];
  if (!key) return false;

  const items = await getItems(key);
  return saveItems(key, items.filter(item => item.id !== id));
}
