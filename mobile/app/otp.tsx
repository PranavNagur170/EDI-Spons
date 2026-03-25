import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { verifyOtp, getCurrentUser } from '../services/auth';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const otpInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      router.replace('/(tabs)');
      return;
    }

    otpInputRef.current?.focus();
  }, [router]);

  const mobile = typeof params.mobile === 'string' ? params.mobile.trim() : '';
  const devOtp = typeof params.otp === 'string' ? params.otp : '';

  const handleVerify = async () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      setMessage('Please enter a valid 6-digit OTP.');
      return;
    }

    console.log('[OTP Screen] Verifying - Mobile:', mobile, 'OTP:', otp);
    setIsLoading(true);
    const result = await verifyOtp(mobile.trim(), otp);
    setIsLoading(false);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    Alert.alert('Success', `Role ${result.session?.role} authenticated`);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>Code sent to {mobile}</Text>
        <Text style={styles.debugText}>Mobile: {mobile} | OTP: {devOtp}</Text>

        <TextInput
          ref={otpInputRef}
          value={otp}
          onChangeText={(value) => { setOtp(value.replace(/[^0-9]/g, '')); }}
          placeholder="Enter 6-digit OTP"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          placeholderTextColor="#94a3b8"
          autoFocus
        />

        <TouchableOpacity
          style={[styles.actionBtn, isLoading && styles.disabledBtn]}
          onPress={handleVerify}
          disabled={isLoading}
        >
          <Text style={styles.actionText}>{isLoading ? 'Verifying...' : 'Verify & Continue'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')}> 
          <Text style={styles.secondaryText}>Use different mobile number</Text>
        </TouchableOpacity>

        {!!message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 14, padding: 20, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 4 },
  title: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  subtitle: { color: '#64748b', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, padding: 14, fontSize: 18, letterSpacing: 8, textAlign: 'center', marginBottom: 12, color: '#0f172a' },
  actionBtn: { backgroundColor: '#2563eb', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 8 },
  actionText: { color: '#fff', fontWeight: '700' },
  disabledBtn: { opacity: 0.6 },
  secondaryText: { color: '#64748b', fontWeight: '600', textAlign: 'center', marginTop: 8 },
  message: { marginTop: 12, color: '#ef4444', textAlign: 'center' },
  debugText: { fontSize: 10, color: '#999', marginBottom: 8, textAlign: 'center' },
});