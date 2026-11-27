
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';

import { talkToMyra } from './src/services/assistant';
import { authenticateOwner } from './src/services/security';

export default function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Hello! I am MYRA. How can I help you today?');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [securityMessage, setSecurityMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    verifyOwner();
  }, []);

  async function verifyOwner() {
    setChecking(true);
    setSecurityMessage('Checking owner security...');

    try {
      const result = await authenticateOwner();
      setUnlocked(result.success);
      setSecurityMessage(result.message);
    } catch (error) {
      setUnlocked(false);
      setSecurityMessage('Security check failed.');
    }

    setChecking(false);
  }

  async function sendMessage() {
    if (!message.trim() || !apiKey.trim()) {
      Alert.alert(
        'MYRA',
        'Please enter your message and Gemini API key in Settings.'
      );
      return;
    }

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

  if (checking) {
    return (
      <View style={styles.center}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <Text style={styles.logo}>MYRA</Text>
        <ActivityIndicator size="large" color="#EF2445" />
        <Text style={styles.status}>{securityMessage}</Text>
      </View>
    );
  }

  if (!unlocked) {
    return (
      <View style={styles.center}>
        <Text style={styles.logo}>MYRA</Text>
        <View style={styles.orb}>
          <Text style={styles.orbLetter}>M</Text>
          <Text style={styles.orbName}>MYRA</Text>
        </View>
        <Text style={styles.heading}>MYRA LOCKED</Text>
        <Text style={styles.status}>{securityMessage}</Text>
        <TouchableOpacity style={styles.mainButton} onPress={verifyOwner}>
          <Text style={styles.buttonText}>Unlock with Fingerprint</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>MYR<Text style={styles.red}>A</Text></Text>
          <Text style={styles.tagline}>AI PERSONAL ASSISTANT</Text>
        </View>

        <TouchableOpacity onPress={() => setActiveTab('Settings')}>
          <Text style={styles.headerIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Home' || activeTab === 'Chat' ? (
        <>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentInner}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.orbArea}>
              <View style={styles.orb}>
                <Text style={styles.orbLetter}>M</Text>
                <Text style={styles.orbName}>MYRA</Text>
              </View>
            </View>

            <Text style={styles.greeting}>Hello!</Text>
            <Text style={styles.subtitle}>
              How can I help you today?
            </Text>

            <View style={styles.replyBox}>
              <Text style={styles.reply}>
                {loading ? 'MYRA is thinking...' : reply}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>More</Text>

            <View style={styles.featureRow}>
              <TouchableOpacity
                style={styles.feature}
                onPress={() => Alert.alert('MYRA', 'Voice feature will be connected next.')}
              >
                <Text style={styles.featureIcon}>〽</Text>
                <Text style={styles.featureText}>Voice</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.feature}
                onPress={() => setActiveTab('Chat')}
              >
                <Text style={styles.featureIcon}>▤</Text>
                <Text style={styles.featureText}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.feature}
                onPress={() => setActiveTab('Triggers')}
              >
                <Text style={styles.featureIcon}>ϟ</Text>
                <Text style={styles.featureText}>Triggers</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendMessage}
              disabled={loading}
            >
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>

        </>
      ) : activeTab === 'Settings' ? (
        <View style={styles.page}>
          <Text style={styles.pageTitle}>Settings</Text>
          <Text style={styles.label}>Gemini API Key</Text>
          <TextInput
            style={styles.settingInput}
            placeholder="Enter your Gemini API key"
            placeholderTextColor="#999"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
          />
          <Text style={styles.note}>
            Your API key is required to use MYRA AI chat.
          </Text>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => {
              Keyboard.dismiss();
              Alert.alert('MYRA', 'API key saved for this session.');
            }}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.page}>
          <Text style={styles.pageTitle}>Triggers</Text>
          <Text style={styles.note}>
            MYRA voice and phone automation features will be connected here.
          </Text>
        </View>
      )}

      <View style={styles.bottomNav}>
        {[
          ['Home', '⌂'],
          ['Chat', '▤'],
          ['Triggers', 'ϟ'],
          ['Settings', '⚙']
        ].map(([tab, icon]) => (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.navIcon,
              activeTab === tab && styles.activeNav
            ]}>
              {icon}
            </Text>
            <Text style={[
              styles.navText,
              activeTab === tab && styles.activeNav
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FA',
  },
  center: {
    flex: 1,
    backgroundColor: '#FFF9FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: '#151515',
    letterSpacing: 1,
  },
  red: {
    color: '#EF2445',
  },
  tagline: {
    fontSize: 8,
    color: '#777',
    letterSpacing: 2,
  },
  headerIcon: {
    fontSize: 27,
    color: '#222',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 20,
  },
  orbArea: {
    marginTop: 15,
    marginBottom: 28,
    alignItems: 'center',
  },
  orb: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#13090D',
    borderWidth: 7,
    borderColor: '#F5A0AD',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F02A4C',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  orbLetter: {
    color: '#EF2445',
    fontSize: 76,
    fontWeight: '900',
  },
  orbName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  greeting: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#151515',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
    marginTop: 7,
    marginBottom: 25,
  },
  replyBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    minHeight: 85,
    borderWidth: 1,
    borderColor: '#F4DDE1',
  },
  reply: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 25,
    marginBottom: 12,
  },
  featureRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F4DDE1',
  },
  featureIcon: {
    fontSize: 27,
    color: '#EF2445',
  },
  featureText: {
    marginTop: 7,
    color: '#333',
    fontWeight: '600',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F1D9DE',
  },
  messageInput: {
    flex: 1,
    color: '#222',
    paddingVertical: 13,
    maxHeight: 90,
  },
  sendButton: {
    width: 43,
    height: 43,
    borderRadius: 25,
    backgroundColor: '#EF2445',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 23,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2E2E5',
  },
  navItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  navIcon: {
    fontSize: 23,
    color: '#888',
  },
  navText: {
    fontSize: 11,
    color: '#888',
    marginTop: 3,
  },
  activeNav: {
    color: '#EF2445',
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    padding: 22,
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  settingInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0CDD4',
    borderRadius: 12,
    padding: 15,
    color: '#222',
  },
  note: {
    color: '#666',
    marginTop: 15,
    lineHeight: 23,
  },
  mainButton: {
    backgroundColor: '#EF2445',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    color: '#555',
    marginTop: 18,
    textAlign: 'center',
  },
});
