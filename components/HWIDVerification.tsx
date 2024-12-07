import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getHWID} from '../utils/hwid';
import {callGetHwidApi, callRegisterHwidApi} from './api_function';

interface HWIDVerificationProps {
  token: string;
  theme: {
    backgroundColor: string;
    textColor: string;
    inputBackground: string;
    inputBorder: string;
  };
  setIsHwidVerified: (verified: boolean) => void;
  setErrorMessage: (message: string) => void;
  errorMessage: string;
}

function HWIDVerification({
  token,
  theme,
  setIsHwidVerified,
  setErrorMessage,
  errorMessage,
}: HWIDVerificationProps) {
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>(
    'checking',
  );

  useEffect(() => {
    const verifyHWID = async () => {
      try {
        const hwidResponse = await callGetHwidApi(token);
        const hwidData = await hwidResponse.json();

        if (hwidResponse.ok && hwidData) {
          const localHwid = await getHWID();
          if (hwidData.hwid) {
            if (hwidData.hwid === localHwid) {
              setIsHwidVerified(true);
              setStatus('success');
            } else {
              const errorMessage = 'HWID mismatch. Please contact support.';
              console.error('HWID mismatch error:', errorMessage);
              setErrorMessage(errorMessage);
              setStatus('error');
            }
          } else {
            await callRegisterHwidApi(token, localHwid);
            setIsHwidVerified(true);
            setStatus('success');
          }
        } else {
          const errorMessage = hwidData?.message || 'HWID verification failed';
          console.error('HWID verification error:', errorMessage);
          setErrorMessage(errorMessage);
          setStatus('error');
        }
      } catch (error) {
        console.error('Error fetching HWID:', error);
        setErrorMessage('An error occurred while verifying HWID');
        setStatus('error');
      }
    };

    verifyHWID();
  }, [token, setIsHwidVerified, setErrorMessage]);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.card}>
        {status === 'checking' && (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color={theme.textColor} />
            <Text style={[styles.statusText, {color: theme.textColor}]}>
              Verifying HWID...
            </Text>
            <Text style={[styles.subText, {color: theme.textColor}]}>
              Please wait while we verify your hardware
            </Text>
          </View>
        )}

        {status === 'success' && (
          <View style={styles.statusContainer}>
            <Icon
              name="check-circle"
              size={60}
              color="#4CAF50"
              style={styles.icon}
            />
            <Text style={[styles.statusText, {color: '#4CAF50'}]}>
              HWID Verified Successfully
            </Text>
            <Text style={[styles.subText, {color: theme.textColor}]}>
              Your hardware is authorized
            </Text>
          </View>
        )}

        {status === 'error' && (
          <View style={styles.statusContainer}>
            <Icon name="error" size={60} color="#F44336" style={styles.icon} />
            <Text style={[styles.statusText, {color: '#F44336'}]}>
              {errorMessage}
            </Text>
            <Text style={[styles.subText, {color: theme.textColor}]}>
              Please contact support if this issue persists
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
  icon: {
    marginBottom: 16,
  },
});

export default HWIDVerification;
