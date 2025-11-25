import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native'
import React, { useState } from 'react'

type Props = {
    onSaveTask: (title: string) => void
}

export default function TaskInput({onSaveTask}: Props) {
    const [text, setText] = useState('')

    const handleSave = () => {
        if (!text.trim()) return
        onSaveTask(text)
        setText('')
    }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={text}
        onChangeText={setText}
      />
        <Pressable onPress={handleSave}>
            {({ pressed }) => (
                <Text style={[styles.saveText]}>
                    Save
                </Text>
            )}
        </Pressable>
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginRight: 10,
    borderRadius: 6
  },
  saveText: {
    fontSize: 18,
    color: '#00aaffff',
  }
});