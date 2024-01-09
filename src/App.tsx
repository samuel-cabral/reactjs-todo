import './global.css'
import styles from './App.module.css'

import { Header } from '@/components/Header'
import { ToDoList } from '@/components/ToDoList'

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <ToDoList />
      </div>
    </div>
  )
}
