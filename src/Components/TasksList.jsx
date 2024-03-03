import { useState } from 'react';
import { Content } from './Content';
import styles from './TasksList.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner';

import plus from '../assets/plus.svg'
import { EmptyTasks } from './EmptyTasks';


export function TasksList() {
   const [tasks, setTasks] = useState(() => {
      const taskOnStorage = localStorage.getItem('tasks');

      if (taskOnStorage) {
         return JSON.parse(taskOnStorage)
      }

      return[]
   })

   const [newCommentedTask, setNewCommentedTask] = useState('')

   function handleCreatNewTask(event) {
         event.preventDefault()

         if (newCommentedTask === '') {
            return
         }

         const newTask = {
            id: uuidv4(),
            content: newCommentedTask,
            isChecked: false,
         }

         const updatedTasks = [...tasks, newTask];

         setTasks(updatedTasks)

         localStorage.setItem('tasks', JSON.stringify(updatedTasks))

         setNewCommentedTask('');
   }

   function handleChangeNewTask(event) {
      setNewCommentedTask(event.target.value);
   }

   const total = tasks.length;

   const CompletedTasks = tasks.filter((task) => task.isChecked).length;

   function handleTaskCheck(taskId) {
      setTasks((prevTasks) => {
         const updatedTasks = prevTasks.map((task) => 
            task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
         );

         localStorage.setItem('tasks', JSON.stringify(updatedTasks))

         return updatedTasks
      })
   }

   function deleteTask(taskToDelete) {
      const deleteOneTask = tasks.filter(task => task.id !== taskToDelete)
      setTasks(deleteOneTask)

      localStorage.setItem('tasks', JSON.stringify(deleteOneTask))
   }

   return (
      <article>
         <Toaster 
            position="top-right" 
            toastOptions={{
               style: { background: 'var(--gray-100)', color: 'var(--blue)'},
               className: 'my-toast',
            }}
         />

         <div>
            <form onSubmit={handleCreatNewTask} className={styles.searchForm}>
               <textarea
                  name="content"
                  placeholder='Adicione uma nova tarefa'
                  value={newCommentedTask}
                  onChange={handleChangeNewTask}
               />
               <button type='submit' onClick={() => {newCommentedTask && toast.success('Tarefa criada com sucesso')}}>
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
      </article>
   )
}