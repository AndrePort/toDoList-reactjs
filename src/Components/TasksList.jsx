import { useState } from 'react';
import { Content } from './Content';
import styles from './TasksList.module.css';
import { v4 as uuidv4 } from 'uuid';

import plus from '../assets/plus.svg'
import { EmptyTasks } from './EmptyTasks';


export function TasksList() {
   const [tasks, setTasks] = useState([])

   const [newCommentedTask, setNewCommentedTask] = useState('')


   function handleCreatNewTask(event) {
         event.preventDefault()

         const newTask = {
            id: uuidv4(),
            content: newCommentedTask,
            isChecked: false,
         }

         setTasks([...tasks, newTask]);
         setNewCommentedTask('');
   }

   function handleChangeNewTask(event) {
      setNewCommentedTask(event.target.value);
   }

   const total = tasks.length;

   const CompletedTasks = tasks.filter((task) => task.isChecked).length;

   function handleTaskCheck(taskId) {
      setTasks((prevTasks) => {
         return prevTasks.map((task) => 
         task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
         );
      })
   }

   function deleteTask(taskToDelete) {
      const deleteOneTask = tasks.filter(task => {
         return task.id !== taskToDelete
      })

      setTasks(deleteOneTask)
   }

   return (
      <div>
         <div className={styles.search}>
            <form onSubmit={handleCreatNewTask} className={styles.searchForm}>
               <textarea
                  name="content"
                  placeholder='Adicione uma nova tarefa'
                  value={newCommentedTask}
                  onChange={handleChangeNewTask}
               
               />
               <button type='submit'>
                  <p>Criar</p>
                  <img src={plus} alt="Plus Icon" />
               </button>
            </form>
         </div>

         <div>
            <header className={styles.header}>
                  <div className={styles.newTasks}>
                     <strong>Tarefas criadas</strong>
                     <span className={styles.circleCount}>{total}</span>
                  </div>
                  <div className={styles.completedTasks}>
                     <strong>Concluídas</strong>
                     <span className={styles.circleCount}>{CompletedTasks} de {total}</span>
                  </div>
            </header>
         </div>

         <div>
            {tasks.length 
               ? tasks.map(task => (
                  <Content 
                     key={task.id} 
                     task={task} 
                     onTaskCheck={handleTaskCheck}
                     onDeleteTask={deleteTask}
                  />)) 
               : <EmptyTasks />
            }
         </div>
      </div>
   )
}