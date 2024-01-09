import styles from './styles.module.css'

import toDoLogo from '@/assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={toDoLogo} alt="Logo do site To Do" />
    </header>
  )
}
