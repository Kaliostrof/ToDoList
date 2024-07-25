import { useState } from 'react';
import styles from './BtnTask.module.css';
import { useParams } from 'react-router-dom';

export const EditTask = ({ refresh }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const params = useParams();

	const onUpdateClick = (event) => {
		event.preventDefault();
		setIsUpdating(true);
		// const editElem = event.target.closest('div');
		// const editIndex = editElem.id;
		// const oldText = editElem.text;
		// console.log(oldText);
		let newText = prompt('Измените задачу:');
		if (newText === null) {
			setIsUpdating(false);
			return;
		} else if (newText !== '') {
			fetch(`http://localhost:3005/list/${params.id}`, {
				method: 'PUT',
				headers: { 'Content-type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					// text: event.target.value,
					text: newText,
				}),
			})
				.then((rawResponce) => {
					rawResponce.json();
				})
				.then((responce) => {
					console.log('Ответ сервера', responce);
					refresh();
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
