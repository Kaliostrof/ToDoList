import { useContext, useState } from 'react';
import { Button } from './button';
import styles from './List.module.css';
import { AppContext } from '../../context';

export const Card = ({ id, text }) => {
	const { refresh } = useContext(AppContext);
	const [data, setData] = useState(text);

	const handleBlur = async (newText) => {
		if (newText === null) return;
		else if (newText) {
			try {
				await fetch(`http://localhost:3005/list/${id}`, {
					method: 'PUT',
					headers: { 'Content-type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						text: newText,
					}),
				});
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleDeleteClick = async () => {
		try {
			await fetch(`http://localhost:3005/list/${id}`, {
				method: 'DELETE',
			});
		} catch (err) {
			console.log(err);
		} finally {
			refresh();
		}
	};

	return (
		<div className={styles.list} key={id} id={id}>
			<input
				className={styles['list-input']}
				placeholder="Добавьте задачу"
				id={id}
				type="text"
				name="text"
				value={data}
				onChange={(event) => {
					setData(event.target.value);
				}}
				onBlur={() => {
					handleBlur(data);
				}}
			></input>
			<div>
				<Button onClick={handleDeleteClick}>Удалить</Button>
			</div>
		</div>
	);
};
