import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useTodos } from './hooks/useTodos';

export type Task = {
  id: string
  title: string
  done: boolean
}

export default function App() {
  const { tasks, saveTasks, toggleTask } = useTodos()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <TaskInput onSaveTask={saveTasks} />
        <TaskList tasks={tasks} onToggleTask={toggleTask} />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10
  }
});
