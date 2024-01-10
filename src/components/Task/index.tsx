import styles from './styles.module.css'

import { Check, Trash } from '@phosphor-icons/react'

export interface TaskType {
  id: number
  title: string
  isCompleted: boolean
}

interface TaskProps {
  task: TaskType
  onCompleteTask: (taskId: number) => void
  onDeleteTask: (taskId: number) => void
}

export function Task({ task, onCompleteTask, onDeleteTask }: TaskProps) {
  function handleCompleteTask() {
    onCompleteTask(task.id)
  }

  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  return (
    <div className={styles.task}>
      <label htmlFor={`task-${task.id}`} className={styles.customCheckbox}>
        <input
          id={`task-${task.id}`}
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleCompleteTask}
        />
        <span className={styles.checkboxButton}>
          {task.isCompleted && <Check size={10} weight="bold" />}
        </span>
      </label>

      <p
        className={
          task.isCompleted ? styles.completedTaskTitle : styles.taskTitle
        }
      >
        {task.title}
      </p>

      <button type="button" onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  )
}
