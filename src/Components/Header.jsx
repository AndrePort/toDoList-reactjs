import styles from './Header.module.css';

import rocketIcon from '../assets/rocket.svg';
import toDoIcon from '../assets/todo.svg';

export function Header() {
    return(
        <div className={styles.header}>
            <img
                src={rocketIcon} 
                alt="Rocket icon"
            />
            <img
                src={toDoIcon} 
                alt="Icon with phrase To do"
            />
        </div>
    )
}