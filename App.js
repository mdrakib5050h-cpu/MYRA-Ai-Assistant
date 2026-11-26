import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>MYRA AI</Text>
      <Text style={styles.subtitle}>
        Your Personal AI Assistant
      </Text>

      <View style={styles.orb}>
        <View style={styles.innerOrb}>
          <Text style={styles.orbText}>MYRA</Text>
        </View>
      </View>

      <Text style={styles.status}>Hello! I am MYRA.</Text>
      <Text style={styles.hint}>
        Your AI assistant is ready.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8B9CFF',
    fontSize: 15,
    marginTop: 8,
  },
  orb: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#263BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 55,
    elevation: 25,
  },
  innerOrb: {
    width: 145,
    height: 145,
    borderRadius: 100,
    backgroundColor: '#111A55',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#70DFFF',
  },
  orbText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },
  status: {
    color: '#FFFFFF',
    fontSize: 19,
  },
  hint: {
    color: '#8993B5',
    marginTop: 10,
  },
});
