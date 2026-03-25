import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Platform } from 'react-native';
import { Camera, BarCodeScanner } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

type ScanResult = {
  type: string;
  data: string;
  visitor?: {
    name: string;
    company: string;
    status: string;
  };
};

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setIsProcessing(true);

    // Simulate API call to verify visitor
    setTimeout(() => {
      const mockVisitor = {
        name: 'Asha Mehta',
        company: 'Acme Corp',
        status: 'Approved',
      };

      setScanResult({
        type,
        data,
        visitor: mockVisitor,
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleManualCheckIn = () => {
    if (!manualCode.trim()) {
      Alert.alert('Error', 'Please enter a visitor code');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      const mockVisitor = {
        name: 'Rohan Patil',
        company: 'Freelancer',
        status: 'Pending',
      };

      setScanResult({
        type: 'manual',
        data: manualCode,
        visitor: mockVisitor,
      });
      setIsProcessing(false);
      setManualCode('');
    }, 1500);
  };

  const resetScan = () => {
    setScanned(false);
    setScanResult(null);
    setManualCode('');
  };

  const handleCheckIn = () => {
    if (!scanResult?.visitor) return;

    Alert.alert(
      'Confirm Check-in',
      `Check in ${scanResult.visitor.name} from ${scanResult.visitor.company}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check In',
          onPress: () => {
            // Simulate check-in API call
            Alert.alert('Success', `${scanResult.visitor?.name} checked in successfully!`);
            resetScan();
          },
        },
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="camera-off" size={64} color="#64748b" />
        <Text style={styles.permissionText}>Camera access denied</Text>
        <Text style={styles.permissionSubtext}>
          Please enable camera permissions in your device settings to scan QR codes.
        </Text>
      </View>
    );
  }

  const shouldUseCamera = Platform.OS !== 'web' && !!(Camera as any)?.Constants;
  const cameraType = shouldUseCamera
    ? ((Camera as any).Constants.Type.back as string)
    : undefined;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Scan Visitor Code</Text>

      {!scanned && (
        <View style={styles.scanSection}>
          {shouldUseCamera ? (
            <View style={styles.cameraContainer}>
              <Camera
                ref={cameraRef}
                style={styles.camera}
                type={cameraType}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                  barCodeTypes: [
                    BarCodeScanner.Constants.BarCodeType.qr,
                    BarCodeScanner.Constants.BarCodeType.code128,
                    BarCodeScanner.Constants.BarCodeType.code39,
                    BarCodeScanner.Constants.BarCodeType.ean13,
                    BarCodeScanner.Constants.BarCodeType.ean8,
                  ],
                }}
              />
              <View style={styles.overlay}>
                <View style={styles.scanFrame} />
                <Text style={styles.scanText}>Position QR code within the frame</Text>
              </View>
            </View>
          ) : (
            <View style={styles.noCameraContainer}>
              <Text style={styles.noCameraText}>
                Camera scanning is currently unavailable in this environment.
              </Text>
              <Text style={styles.noCameraText}>
                Please use a mobile device or enter code manually.
              </Text>
            </View>
          )}

          <View style={styles.manualEntry}>
            <Text style={styles.orText}>Or enter code manually</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.manualInput}
                placeholder="Enter visitor code"
                value={manualCode}
                onChangeText={setManualCode}
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity
                style={styles.manualBtn}
                onPress={handleManualCheckIn}
                disabled={isProcessing}
              >
                <Ionicons name="search" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {isProcessing && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.processingText}>Verifying visitor...</Text>
        </View>
      )}

      {scanResult && !isProcessing && (
        <View style={styles.resultSection}>
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
              <Text style={styles.resultTitle}>Visitor Found</Text>
            </View>

            <View style={styles.visitorInfo}>
              <Text style={styles.visitorName}>{scanResult.visitor?.name}</Text>
              <Text style={styles.visitorCompany}>{scanResult.visitor?.company}</Text>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Status:</Text>
                <Text style={[
                  styles.statusValue,
                  scanResult.visitor?.status === 'Approved' && styles.statusApproved,
                  scanResult.visitor?.status === 'Pending' && styles.statusPending,
                ]}>
                  {scanResult.visitor?.status}
                </Text>
              </View>
            </View>

            <View style={styles.codeInfo}>
              <Text style={styles.codeLabel}>Scanned Code:</Text>
              <Text style={styles.codeValue}>{scanResult.data}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.checkInBtn} onPress={handleCheckIn}>
              <Ionicons name="log-in" size={20} color="#ffffff" />
              <Text style={styles.checkInText}>Check In Visitor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scanAgainBtn} onPress={resetScan}>
              <Ionicons name="scan" size={20} color="#64748b" />
              <Text style={styles.scanAgainText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  contentContainer: { padding: 16, paddingBottom: 120 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 20 },
  permissionText: { fontSize: 18, fontWeight: '600', color: '#0f172a', marginTop: 16, textAlign: 'center' },
  permissionSubtext: { fontSize: 14, color: '#64748b', textAlign: 'center', marginTop: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 20, textAlign: 'center' },
  scanSection: { alignItems: 'center' },
  cameraContainer: { width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', marginBottom: 20, position: 'relative' },
  camera: { flex: 1 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  scanFrame: { width: 200, height: 200, borderWidth: 2, borderColor: '#ffffff', borderRadius: 12, borderStyle: 'dashed' },
  scanText: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginTop: 16, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  noCameraContainer: { width: '100%', borderRadius: 16, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', padding: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  noCameraText: { textAlign: 'center', color: '#64748b', marginBottom: 6 },
  manualEntry: { width: '100%', alignItems: 'center' },
  orText: { fontSize: 14, color: '#64748b', marginBottom: 12 },
  inputRow: { flexDirection: 'row', width: '100%', marginBottom: 16 },
  manualInput: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginRight: 8, borderWidth: 1, borderColor: '#e2e8f0', color: '#0f172a' },
  manualBtn: { backgroundColor: '#2563eb', borderRadius: 12, padding: 12, justifyContent: 'center', alignItems: 'center', width: 48 },
  processingContainer: { alignItems: 'center', paddingVertical: 40 },
  processingText: { fontSize: 16, color: '#64748b', marginTop: 12 },
  resultSection: { width: '100%' },
  resultCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 4 },
  resultHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  resultTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginLeft: 8 },
  visitorInfo: { marginBottom: 16 },
  visitorName: { fontSize: 20, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  visitorCompany: { fontSize: 16, color: '#64748b', marginBottom: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusLabel: { fontSize: 14, color: '#64748b', marginRight: 8 },
  statusValue: { fontSize: 14, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusApproved: { backgroundColor: '#dcfce7', color: '#16a34a' },
  statusPending: { backgroundColor: '#fef3c7', color: '#b45309' },
  codeInfo: { borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 16 },
  codeLabel: { fontSize: 12, color: '#64748b', marginBottom: 4 },
  codeValue: { fontSize: 14, color: '#0f172a', fontFamily: 'monospace' },
  actionButtons: { gap: 12 },
  checkInBtn: { backgroundColor: '#16a34a', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  checkInText: { color: '#ffffff', fontWeight: '700', fontSize: 16, marginLeft: 8 },
  scanAgainBtn: { backgroundColor: '#ffffff', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  scanAgainText: { color: '#64748b', fontWeight: '700', fontSize: 16, marginLeft: 8 },
});
