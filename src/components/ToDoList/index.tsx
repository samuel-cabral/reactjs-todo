import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { PlusCircle } from '@phosphor-icons/react'

import emptyTasksImg from '@/assets/empty-tasks.svg'
import { Task, TaskType } from '@/components/Task'

import styles from './styles.module.css'

export function ToDoList() {
  const [newTask, setNewTask] = useState<TaskType>({} as TaskType)
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      title:
        'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isCompleted: false,
    },
    {
      id: 2,
      title:
        'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isCompleted: false,
    },
    { id: 3, title: 'Tarefa 3', isCompleted: false },
    { id: 4, title: 'Tarefa 4', isCompleted: false },
    { id: 5, title: 'Tarefa 5', isCompleted: false },
  ])
  const completedTasks = tasks.filter((task) => task.isCompleted)

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setTasks([...tasks, newTask])
    setNewTask({
      id: 0,
      title: '',
      isCompleted: false,
    } as TaskType)
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    const { value } = event.target

    setNewTask({ id: Date.now(), title: value, isCompleted: false } as TaskType)
  }

  function handleInvalidTaskTitle(event: InvalidEvent<HTMLInputElement>) {
    const { value } = event.target

    if (!value) {
      event.target.setCustomValidity('Insira um título para a tarefa')
    } else {
      event.target.setCustomValidity('')
    }
  }

  function toggleCompleteTask(taskId: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  function deleteTask(taskId: number) {
    const updatedTasks = [...tasks.filter((task) => task.id !== taskId)]

    setTasks(updatedTasks)
  }

  const tasksEmpty = tasks.length === 0

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateNewTask}>
        <input
          className={styles.newTaskInput}
          type="text"
          placeholder="Adicione uma nova tarefa"
          required
          value={newTask.title}
          onChange={handleNewTaskChange}
          onInvalid={handleInvalidTaskTitle}
        />

        <button type="submit">
          Criar
          <PlusCircle />
        </button>
      </form>

      <header className={styles.tasksTracker}>
        <p className={styles.createdTasks}>
          <strong>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </p>

        <p className={styles.completedTasks}>
          <strong>Concluídas</strong>
          <span>
            {completedTasks.length} de {tasks.length}
          </span>
        </p>
      </header>

      <main>
        {tasksEmpty ? (
          <div className={styles.emptyTasks}>
            <img src={emptyTasksImg} alt="Você não tem tarefas" />

            <div>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onCompleteTask={toggleCompleteTask}
                onDeleteTask={deleteTask}
              />
            ))}
          </>
        )}
      </main>
    </div>
  )
}
