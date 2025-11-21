import React from 'react';
import { FlatList } from 'react-native';
import { Task } from '../App';
import TaskItem from './TaskItem';

type Props = {
  tasks: Task[]
  onToggleTask: (id: string) => void
}

export default function TaskList({ tasks, onToggleTask }: Props) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <TaskItem task={item} onToggle={onToggleTask} />
      }
    />
  )
}
