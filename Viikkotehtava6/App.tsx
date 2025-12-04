import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CameraView, useCameraPermissions, BarcodeScanningResult, BarcodeType } from 'expo-camera';

const barcodeType = ['ean13', 'ean8']

export default function App() {
  const [barcode, setBarcode] = useState<string | null>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState<boolean>(false)

  useEffect((): void => {
    if (permission && !permission.granted) {
      requestPermission()
    }
  }, [permission, requestPermission])

  if (!permission) {
    return <View style={styles.center}>
      <Text>Requesting camera permission...</Text>
    </View>
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>You must allow access to camera before you can scan barcodes</Text>
        <Button title="Allow access to camera" onPress={requestPermission} />
        <StatusBar style="auto" />
      </View>
    );
  }
 
  const handleBarcodeScanned = (result: BarcodeScanningResult): void => {
    if (!scanned && result?.data) {
      setScanned(true)
      setBarcode(result.data)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        active={!scanned}
        barcodeScannerSettings={{ barcodeTypes: barcodeType as BarcodeType[] }}
        onBarcodeScanned={ scanned ? undefined : handleBarcodeScanned }
      />
      {barcode && (
        <View style={styles.scanResults}>
          <Text style={{ fontSize: 18 }}>Barcode: {barcode}</Text>
          <Button title="Scan again" onPress={() => {
            setScanned(false)
            setBarcode(null)
          }}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanResults: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center'
  }
});
