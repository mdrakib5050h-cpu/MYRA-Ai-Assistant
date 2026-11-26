import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Keyboard
} from 'react-native';
import { talkToMyra } from './src/services/assistant';

export default function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Hello! I am MYRA.');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  async function sendMessage() {
    if (!message.trim() || !apiKey.trim()) return;

    Keyboard.dismiss();
    setLoading(true);

    try {
      const result = await talkToMyra(message, apiKey);
      setReply(result);
      setMessage('');
    } catch (error) {
      setReply('Sorry! Something went wrong.');
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MYRA AI</Text>
      <Text style={styles.subtitle}>Your Personal Assistant</Text>

      <View style={styles.orb}>
        <Text style={styles.orbText}>MYRA</Text>
      </View>

      <Text style={styles.status}>
        {loading ? 'MYRA is thinking...' : 'Ready to assist you'}
      </Text>

      <ScrollView style={styles.chat}>
        <Text style={styles.reply}>{reply}</Text>
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Enter Gemini API Key"
        placeholderTextColor="#888"
        value={apiKey}
        onChangeText={setApiKey}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Talk to MYRA..."
        placeholderTextColor="#888"
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={sendMessage}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Please wait...' : 'Send Message'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B20',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8B9CFF',
    marginTop: 5,
  },
  orb: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#263BFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    borderWidth: 4,
    borderColor: '#70DFFF',
  },
  orbText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  status: {
    color: '#70DFFF',
    marginBottom: 15,
  },
  chat: {
    width: '100%',
    maxHeight: 130,
  },
  reply: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#182044',
    color: 'white',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#354DFF',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
