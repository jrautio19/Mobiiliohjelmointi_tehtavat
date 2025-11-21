import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

export type Task = {
  id: string
  title: string
  done: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadData = async () => {
      const json = await AsyncStorage.getItem('tasks')
      if (json) setTasks(JSON.parse(json))
    }
    loadData()
  }, [])

  useEffect(() => {
    const saveData = async () => {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
    }
    saveData()
  }, [tasks])

  const saveTasks = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      done: false,
    }
    setTasks(prev => [...prev, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  } 

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
