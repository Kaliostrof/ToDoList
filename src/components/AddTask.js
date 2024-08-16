import styles from './AddTask.module.css';
import { useDispatch } from 'react-redux';
import { addToDo } from '../store/actions';
import { useState } from 'react';

export const AddTask = () => {
	const [isCreating, setIsCreating] = useState(false);
	const [inputData, setInputData] = useState('');
	const dispatch = useDispatch();

	const onValueInputChange = ({ target }) => {
		setInputData(target.value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		setIsCreating(true);

		if (inputData) {
			try {
				await dispatch(addToDo(inputData));
			} catch (err) {
				console.log(err);
			} finally {
				setIsCreating(false);
				setInputData('');
			}
		} else {
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
