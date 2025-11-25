import React from 'react';
import { Pressable, StyleSheet, Text, View, TextStyle } from 'react-native';
import { Task } from '../App';

type Props = {
  task: Task
  onToggle: (id: string) => void
}

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <Pressable onPress={() => onToggle(task.id)} style={styles.container}>
        <Text style={textStyle(task.done)}>{task.title}</Text>
    </Pressable>
  )
}

export const textStyle = (done: boolean): TextStyle => ({
    fontSize: 18,
    textDecorationLine: done ? 'line-through' : 'none',
    color: done ? '#888' : '#000'
})

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});