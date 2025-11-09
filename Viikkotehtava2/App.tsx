import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  
  return (
    <View style={styles.container}>
      {!modalVisible && (
      <Pressable onPress={() => setModalVisible(true)}>
        {({ pressed }) => (
          <Text
            style={[styles.text, { opacity: pressed ? 0.6 : 1.0 },
            ]}
          >
            Show modal message
          </Text>
        )}
      </Pressable>
      )}
      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>This is modal...</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              {({ pressed }) => (
                <Text
                  style={[
                    styles.closeText,
                    { opacity: pressed ? 0.6 : 1.0 },
                  ]}
                >
                  Close
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  modalView: {
    backgroundColor: 'rgba(168, 168, 168, 0.4)',
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 40,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
