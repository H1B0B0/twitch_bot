import DeviceInfo from 'react-native-device-info';
import CryptoJS from 'crypto-js';

export const getHWID = async (): Promise<string> => {
    try {
        const uniqueId = DeviceInfo.getUniqueId();
        const deviceId = DeviceInfo.getDeviceId();
        const systemName = DeviceInfo.getSystemName();
        const systemVersion = DeviceInfo.getSystemVersion();

        const hwidString = `${uniqueId}|${deviceId}|${systemName}|${systemVersion}`;
        return CryptoJS.MD5(hwidString).toString();
    } catch (error) {
        console.error('Error generating HWID:', error);
        throw error;
    }
};