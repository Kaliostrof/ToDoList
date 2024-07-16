import styles from './BtnTask.module.css';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const DeleteTask = ({ refresh }) => {
	const onDeleteClick = (event) => {
		event.preventDefault();
		const editElem = event.target.closest('div');
		const editIndex = editElem.id;
		const todoRef = ref(db, `list/${editIndex}`);

		remove(todoRef).then((responce) => {
			console.log('Задача удалена', responce);
		});
	};

	return (
		<button className={styles['list-btn']} onClick={onDeleteClick}>
			Удалить
		</button>
	);
};
