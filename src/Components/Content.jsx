import styles from './Content.module.css';
import unchecked from '../assets/unchecked.svg';
import checked from '../assets/checked.svg';
import uncheckedHover from '../assets/unchecked-hover.svg';
import checkedHover from '../assets/checked-hover.svg';
import trash from '../assets/trash.svg';
import trashHover from '../assets/trash-hover.svg';
import { useState,  } from 'react';

export function Content({ task, onTaskCheck, onDeleteTask }) {

    const [isHovered, setIsHovered] = useState(false);
    const [hoverOnTras, setHoverOnTrash] = useState(false);
  
    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };
  
    const handleCheck = () => {
        onTaskCheck(task.id);
    };

    function handleDeleteTask() {
      onDeleteTask(task.id)
    }
  
    const imageSrc = task.isChecked
      ? isHovered
        ? checkedHover
        : checked
      : isHovered
      ? uncheckedHover
      : unchecked;
  
    const iconTrash = hoverOnTras ? trashHover : trash;
    
    return (
      <div className={styles.content}>
        <img
          src={imageSrc}
          alt="Empty check"
          onClick={handleCheck}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        <span className={task.isChecked ? styles.completedTask : styles.incompletedTask}>
            {task.content}
        </span>
        <button onClick={handleDeleteTask} tittle='Delete Task'>
            <img 
              src={iconTrash}
              alt="icon trash"
              onMouseOver={() => setHoverOnTrash(true)}
              onMouseOut={() => setHoverOnTrash(false)}
             />
        </button>
      </div>
    );
  }