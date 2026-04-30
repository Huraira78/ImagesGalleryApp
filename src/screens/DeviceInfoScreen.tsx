import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getDeviceInfo, DeviceInfo } from '../native/DeviceDetails';

const DeviceInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDeviceInfo()
      .then((data) => {
        setInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch device info from Native Module.');
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={28} color="#2d3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Device Details</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff6b6b" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : info ? (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Brand</Text>
              <Text style={styles.value}>{info.brand}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Model</Text>
              <Text style={styles.value}>{info.model}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Manufacturer</Text>
              <Text style={styles.value}>{info.manufacturer}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Device</Text>
              <Text style={styles.value}>{info.device}</Text>
            </View>
            <View style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={styles.label}>Android Version</Text>
              <Text style={styles.value}>{info.systemVersion} (SDK {info.sdkVersion})</Text>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3436',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  label: {
    fontSize: 16,
    color: '#636e72',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '800',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default DeviceInfoScreen;
