import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { sendOtp, getCurrentUser } from '../services/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [devOtp, setDevOtp] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      router.replace('/(tabs)');
    }
  }, [router]);

  const handleSendOtp = async () => {
    setMessage('');
    const cleanMobile = mobile.trim();
    if (!/^[0-9]{10}$/.test(cleanMobile)) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    console.log('[Login Screen] Sending OTP for mobile:', cleanMobile);
    setIsLoading(true);
    const result = await sendOtp(cleanMobile);
    setIsLoading(false);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    const obfuscated = cleanMobile.replace(/(\d{3})(\d{4})(\d{3})/, '$1****$3');
    setMessage('OTP sent to ' + obfuscated + '. Redirecting...');
    if (result.otp) setDevOtp(result.otp);
    
    setTimeout(() => {
      router.replace({
        pathname: '/otp',
        params: { mobile: cleanMobile, otp: result.otp },
      });
    }, 800);
  };



  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Visitor Management</Text>
        <Text style={styles.subtitle}>Enter your mobile number to log in</Text>

        <TextInput
          value={mobile}
          onChangeText={(value) => setMobile(value.replace(/[^0-9]/g, ''))}
          placeholder="Mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          placeholderTextColor="#94a3b8"
        />
        <TouchableOpacity
          style={[styles.actionBtn, (isLoading || mobile.length !== 10) && styles.disabledBtn]}
          onPress={handleSendOtp}
          disabled={isLoading || mobile.length !== 10}
        >
          <Text style={styles.actionText}>{isLoading ? 'Sending OTP...' : 'Send OTP'}</Text>
        </TouchableOpacity>

        {!!message && <Text style={styles.message}>{message}</Text>}
        {!!devOtp && <Text style={styles.devOtp}>Dev OTP: {devOtp}</Text>}

        <Text style={styles.otpHint}>No OTP input on this screen; open the OTP screen to verify.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 14, padding: 20, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 5 },
  title: { fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  subtitle: { color: '#64748b', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, padding: 12, marginBottom: 12, color: '#0f172a' },
  helpText: { color: '#334155', marginBottom: 8 },
  actionBtn: { backgroundColor: '#2563eb', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 10 },
  actionText: { color: '#fff', fontWeight: '700' },
  disabledBtn: { opacity: 0.6 },
  secondaryBtn: { alignItems: 'center', paddingVertical: 8 },
  secondaryText: { color: '#64748b', textDecorationLine: 'underline' },
  message: { marginTop: 10, color: '#ef4444', fontWeight: '600', textAlign: 'center' },
  otpHint: { marginTop: 12, color: '#475569', textAlign: 'center' },
  devOtp: { marginTop: 4, color: '#16a34a', fontSize: 12, textAlign: 'center' },
});