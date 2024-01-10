import './global.css'
import styles from './App.module.css'

import { Header } from '@/components/Header'
import { ToDoList } from '@/components/ToDoList'

export function App() {
  return (
    <div>
      <Header />

      <main className={styles.wrapper}>
        <ToDoList />
      </main>
    </div>
  )
}
