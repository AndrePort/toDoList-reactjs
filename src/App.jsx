import { Header } from './Components/Header';
import { TasksList } from './Components/TasksList';

import styles from './App.module.css';
import './Global.css';


export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <TasksList />
      </div>
    </div>
    
    
  )
}
