import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>VMS Mobile</Text>
      <ActivityIndicator size="large" color="#2563eb" style={styles.spinner} />
      <Text style={styles.subtitle}>Loading your visitor management dashboard…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: 20 },
  logo: { width: 90, height: 90, marginBottom: 18 },
  title: { fontSize: 26, fontWeight: '800', color: '#0f172a' },
  spinner: { marginTop: 20 },
  subtitle: { marginTop: 12, color: '#64748b', textAlign: 'center', maxWidth: 280 },
});