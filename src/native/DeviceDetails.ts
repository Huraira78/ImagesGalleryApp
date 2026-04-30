import { NativeModules } from 'react-native';

export interface DeviceInfo {
  brand: string;
  model: string;
  systemVersion: string;
  sdkVersion: number;
  device: string;
  manufacturer: string;
}

const { DeviceDetails } = NativeModules;

export const getDeviceInfo = (): Promise<DeviceInfo> => {
  return DeviceDetails.getDeviceInfo();
};

export default DeviceDetails;
