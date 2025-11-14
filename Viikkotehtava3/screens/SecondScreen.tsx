import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Second'>

export default function SecondScreen({}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SecondScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  text: {
    fontSize: 20,
  },
});