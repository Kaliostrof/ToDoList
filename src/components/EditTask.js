import { useState } from 'react';
import styles from './BtnTask.module.css';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const EditTask = ({ refresh }) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const onUpdateClick = (event) => {
		event.preventDefault();
		setIsUpdating(true);
		const editElem = event.target.closest('div');
		const editIndex = editElem.id;
		const todoRef = ref(db, `list/${editIndex}`);

		let newText = prompt('Измените задачу:');
		if (newText === null) {
			setIsUpdating(false);
			return;
		} else if (newText !== '') {
			set(todoRef, {
				text: newText,
			})
				.then((responce) => {
					console.log('Ответ сервера', responce);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		} else {
			alert('Ввод пустой строки запрещён!');
			setIsUpdating(false);
		}

		// document.addEventListener('keydown', (event) => {
		// 	let key = event.key;
		// 	if (key === 'Enter') {

		// 	}
		// });
	};

	return (
		<button
			className={styles['list-btn']}
			onClick={onUpdateClick}
			disabled={isUpdating}
		>
			Редактировать
		</button>
	);
};
