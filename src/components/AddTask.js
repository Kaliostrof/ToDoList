import { useState } from 'react';
import styles from './AddTask.module.css';

export const AddTask = ({ refresh, setInputData, inputData, onValueInputChange }) => {
	const [isCreating, setIsCreating] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		setIsCreating(true);

		if (inputData !== '') {
			fetch('http://localhost:3005/list', {
				method: 'POST',
				headers: { 'Content-type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					text: inputData,
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
					setIsCreating(false);
					setInputData('');
				});
		} else {
			alert('Error!');
			setIsCreating(false);
		}
	};

	return (
		<div className={styles.add}>
			<form className={styles['add-form']} onSubmit={onSubmit}>
				<input
					className={styles['add-input']}
					placeholder="Добавьте задачу"
					type="text"
					name="text"
					value={inputData}
					onChange={onValueInputChange}
				></input>
				<button className={styles['add-button']} disabled={isCreating}>
					Добавить
				</button>
			</form>
		</div>
	);
};
