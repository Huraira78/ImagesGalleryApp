import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../components/InputField';
import Toast from '../components/Toast';
import { validateName, validateEmail, validatePhone, validatePassword } from '../utils/validators';

const { height } = Dimensions.get('window');

const BG_IMAGE = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ name: '', email: '', phone: '', password: '' });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'error' | 'success'>('error');

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleRegister = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const passErr = validatePassword(password);

    setErrors({ name: nameErr, email: emailErr, phone: phoneErr, password: passErr });

    if (nameErr || emailErr || phoneErr || passErr) {
      showToast('Please fix the validation errors before continuing', 'error');
      return;
    }

    showToast('Registration successful!', 'success');

    setTimeout(() => {
      navigation.navigate('Welcome' as never);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: BG_IMAGE }} style={styles.bgImage} />
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.formWrapper}>
          <View style={styles.topLogoContainer}>
            <View style={[styles.iconWrapper, { backgroundColor: '#ff4757', overflow: 'hidden' }]}>
              <View style={{
                position: 'absolute',
                top: -20,
                left: -20,
                width: 120,
                height: 120,
                backgroundColor: '#ff6b6b',
                borderRadius: 60,
              }} />
              <Icon name="camera" size={42} color="#ffffff" />
            </View>
          </View>
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Join Gallery</Text>
                <Text style={styles.subtitle}>Create an account to save and share your beautiful moments.</Text>
              </View>

              <InputField
                label="Full Name"
                placeholder="John Doe"
                value={name}
                error={errors.name}
                onChangeText={(text) => { setName(text); setErrors(prev => ({ ...prev, name: '' })) }}
              />

              <InputField
                label="Email Address"
                placeholder="john@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                error={errors.email}
                onChangeText={(text) => { setEmail(text); setErrors(prev => ({ ...prev, email: '' })) }}
              />

              <InputField
                label="Phone Number"
                placeholder="1234567890"
                keyboardType="numeric"
                maxLength={10}
                value={phone}
                error={errors.phone}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9]/g, '');
                  setPhone(numericValue);
                  setErrors(prev => ({ ...prev, phone: '' }));
                }}
              />

              <InputField
                label="Password"
                placeholder="••••••••"
                secureTextEntry
                value={password}
                error={errors.password}
                onChangeText={(text) => { setPassword(text); setErrors(prev => ({ ...prev, password: '' })) }}
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleRegister} activeOpacity={0.8}>
                <Text style={styles.submitButtonText}>Create Account</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Toast message={toastMessage} type={toastType} onHide={() => setToastMessage('')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f0',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  topLogoContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? -130 : -145,
    // top: -150,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  topLogoTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formWrapper: {
    height: height * 0.7,
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 0,
    borderTopWidth: 6,
    borderTopColor: '#ff6b6b',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 30,
    paddingTop: 35,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
  },
  headerContainer: {
    marginBottom: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#636e72',
    lineHeight: 22,
  },
  submitButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default RegisterScreen;
