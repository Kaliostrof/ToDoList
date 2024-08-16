import { useDispatch } from 'react-redux';
import { Button } from './button';
import styles from './List.module.css';
import { deleteToDo, updateToDo } from '../../store/actions';
import { useState } from 'react';

export const List = ({ id, text }) => {
	const dispatch = useDispatch();
	const [editData, setEditData] = useState(text);

	const handleDeleteClick = () => {
		dispatch(deleteToDo({ id, text }));
	};

	const handleEditBlur = () => {
		let text = editData;
		if (text === null) {
			return;
		} else if (text) {
			const newToDo = { text, id };
			dispatch(updateToDo(newToDo));
		} else {
			alert('Ввод пустой строки запрещён!');
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
				value={editData}
				onChange={(event) => {
					setEditData(event.target.value);
				}}
				onBlur={() => {
					handleEditBlur();
				}}
			></input>

			<div>
				<Button onClick={handleDeleteClick} />
			</div>
		</div>
	);
};
