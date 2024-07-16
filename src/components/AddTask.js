import { useState } from 'react';
import styles from './AddTask.module.css';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const AddTask = ({ setInputData, inputData, onValueInputChange }) => {
	const [isCreating, setIsCreating] = useState(false);

	const todosRef = ref(db, 'list');

	const onSubmit = (event) => {
		event.preventDefault();
		setIsCreating(true);

		if (inputData !== '') {
			push(todosRef, {
				text: inputData,
			})
				.then((responce) => {
					console.log('Ответ сервера', responce);
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
