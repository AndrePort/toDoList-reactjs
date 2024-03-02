import styles from './EmptyTasks.module.css';

import clipboard from '../assets/clipboard.svg'

export function EmptyTasks() {
    return (
        <div>
            <div className={styles.content}>
                <img 
                    src={clipboard} 
                    alt="Clipboard Image"
                />
                <div className={styles.emptyList}>
                    <p>Você ainda não tem tarefas cadastradas</p>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            </div>
        </div>
    )
}