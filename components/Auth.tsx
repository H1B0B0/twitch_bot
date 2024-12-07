import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Home from './Home';
import HWIDVerification from './HWIDVerification';
import {getHWID} from '../utils/hwid';

import {
  callRegisterApi,
  callLoginApi,
  callRegisterHwidApi,
  callGetHwidApi,
} from './api_function';

interface AuthProps {
  theme: {
    backgroundColor: string;
    textColor: string;
    inputBackground: string;
    inputBorder: string;
    placeholderColor: string;
  };
  isDarkMode: boolean;
}

function Auth({theme: propTheme, isDarkMode}: AuthProps): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHwidVerified, setIsHwidVerified] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!isLogin && password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await callLoginApi(username, password);
      } else {
        response = await callRegisterApi(username, password);
      }
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUsername(data.username);
        setErrorMessage('');
        if (!isLogin) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
          setIsLogin(!isLogin);
        }
      } else {
        setErrorMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const localTheme = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    textColor: isDarkMode ? '#ffffff' : '#333333',
    inputBackground: isDarkMode ? '#333333' : '#ffffff',
    inputBorder: isDarkMode ? '#444444' : '#dddddd',
    placeholderColor: isDarkMode ? '#888888' : '#666666',
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: localTheme.backgroundColor}]}>
      {token ? (
        isHwidVerified ? (
          <Home
            token={token}
            username={username}
            theme={localTheme}
            onLogout={() => setToken('')}
          />
        ) : (
          <HWIDVerification
            token={token}
            theme={localTheme}
            setIsHwidVerified={setIsHwidVerified}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage} // Ajoutez cette ligne
          />
        )
      ) : (
        <View style={styles.formContainer}>
          <Text style={[styles.title, {color: localTheme.textColor}]}>
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </Text>

          {errorMessage ? (
            <Text style={[styles.errorText, {color: 'red'}]}>
              {errorMessage}
            </Text>
          ) : null}

          <Animated.View style={[styles.inputContainer]}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: localTheme.inputBackground,
                  borderColor: localTheme.inputBorder,
                  color: localTheme.textColor,
                },
              ]}
              placeholder="Username"
              placeholderTextColor={localTheme.placeholderColor}
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: localTheme.inputBackground,
                  borderColor: localTheme.inputBorder,
                  color: localTheme.textColor,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={localTheme.placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {!isLogin && (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: localTheme.inputBackground,
                    borderColor: localTheme.inputBorder,
                    color: localTheme.textColor,
                  },
                ]}
                placeholder="Confirm Password"
                placeholderTextColor={localTheme.placeholderColor}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            )}

            <Pressable
              style={({pressed}) => [
                styles.button,
                {backgroundColor: pressed ? '#005BB5' : '#007AFF'},
                isLoading && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.buttonText}>
                  {isLogin ? 'Login' : 'Register'}
                </Text>
              )}
            </Pressable>

            <Pressable
              style={({pressed}) => [
                styles.toggleButton,
                {backgroundColor: pressed ? '#E0E0E0' : 'transparent'},
              ]}
              onPress={toggleForm}>
              <Text style={[styles.toggleText, {color: '#007AFF'}]}>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      )}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{x: 0, y: 0}}
          fadeOut={true}
          fallSpeed={2000}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Auth;
