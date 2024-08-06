import { useContext, useState } from 'react';
import styles from './BtnTask.module.css';
import { AppContext } from '../../context';
import { CardContext } from '../context';

export const EditTask = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const { refresh } = useContext(AppContext);
	const { id } = useContext(CardContext);
	console.log('Refresh:', refresh);
	const onUpdateClick = (event) => {
		event.preventDefault();
		setIsUpdating(true);
		let newText = prompt('Измените задачу:');
		if (newText === null) {
			setIsUpdating(false);
			return;
		} else if (newText !== '') {
			fetch(`http://localhost:3005/list/${id}`, {
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
