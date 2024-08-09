import { useContext, useState } from 'react';
import styles from './AddTask.module.css';
import { AppContext } from '../context';

export const AddTask = () => {
	const [isCreating, setIsCreating] = useState(false);
	const { refresh } = useContext(AppContext);
	const [inputData, setInputData] = useState('');

	const onValueInputChange = ({ target }) => {
		setInputData(target.value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setIsCreating(true);

		if (inputData) {
			try {
				await fetch('http://localhost:3005/list', {
					method: 'POST',
					headers: { 'Content-type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						text: inputData,
					}),
				});
			} catch (err) {
				console.log(err);
			} finally {
				setIsCreating(false);
				setInputData('');
				refresh();
			}
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
