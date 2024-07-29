import { useContext } from 'react';
import styles from './BtnTask.module.css';
import { AppContext } from '../context';

export const DeleteTask = ({ refresh }) => {
	const { id } = useContext(AppContext);
	const onDeleteClick = (event) => {
		event.preventDefault();
		// const editElem = event.target.closest('div');
		// const editIndex = editElem.id;
		fetch(`http://localhost:3005/list/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponce) => {
				rawResponce.json();
			})
			.then((responce) => {
				console.log('Задача удалена', responce);
				refresh();
			});
	};

	return (
		<button className={styles['list-btn']} onClick={onDeleteClick}>
			Удалить
		</button>
	);
};
