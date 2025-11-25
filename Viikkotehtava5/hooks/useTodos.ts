import { useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Task } from '../App'

type Action =
  | { type: 'ADD_TASK'; title: string }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'SET_TASKS'; tasks: Task[] }

const tasksReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.title,
        done: false,
      }
      return [...state, newTask]

    case 'TOGGLE_TASK':
        return state.map(t =>
            t.id === action.id ? { ...t, done: !t.done } : t
        )

    case 'SET_TASKS':
      return action.tasks

    default:
      return state
  }
}

export function useTodos() {
  const [tasks, dispatch] = useReducer(tasksReducer, [])

  useEffect(() => {
    const loadData = async () => {
      const json = await AsyncStorage.getItem('tasks')
      if (json) {
        dispatch({ type: 'SET_TASKS', tasks: JSON.parse(json) })
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const saveTasks = (title: string) =>
    dispatch({ type: 'ADD_TASK', title })

  const toggleTask = (id: string) =>
    dispatch({ type: 'TOGGLE_TASK', id })

  return {
    tasks,
    saveTasks,
    toggleTask,
  }
}
