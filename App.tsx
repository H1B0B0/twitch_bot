import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Animated,
  useColorScheme,
  Switch,
  ActivityIndicator
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Auth from './components/Auth';

import {
  callRegisterApi,
  callLoginApi,
  callRegisterHwidApi,
  callGetHwidApi,
  callProfileApi,
  callPaymentSuccessApi,
  callPaymentCancelApi,
  callCreateCheckoutSessionApi,
  callCheckSubscriptionApi,
  callIsSubscribedApi,
  callGetBannedStatusApi,
  callBanUserApi
} from './components/api_function';

function App(): React.JSX.Element {
  const systemColorScheme = useColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };


  const theme = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    textColor: isDarkMode ? '#ffffff' : '#333333',
    inputBackground: isDarkMode ? '#333333' : '#ffffff',
    inputBorder: isDarkMode ? '#444444' : '#dddddd',
    placeholderColor: isDarkMode ? '#888888' : '#666666',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.themeToggle}>
        <Text style={[styles.themeText, { color: theme.textColor }]}>
          {isDarkMode ? '🌙' : '☀️'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#007AFF', true: '#007AFF' }}
          thumbColor={isDarkMode ? '#FFFFFF' : '#333333'}
        />
      </View>

      <Auth
        theme={theme}
        isDarkMode={isDarkMode}
      />

      {showConfetti && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut={true} fallSpeed={2000} />}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  themeText: {
    fontSize: 20,
    marginRight: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
  },
  errorText: {
    marginBottom: 20,
    fontSize: 16,
  },
});

export default App;