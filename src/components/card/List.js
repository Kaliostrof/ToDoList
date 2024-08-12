import { useDispatch, useSelector } from 'react-redux';
import { Button } from './button';
import styles from './List.module.css';
import { selectIsRefresh } from '../../selectors';
import { setRefreshFlag } from '../../actions';
import { useState } from 'react';

export const List = ({ id, text }) => {
	const dispatch = useDispatch();
	const [editData, setEditData] = useState(text);
	// const editData = useSelector(selectEditData);

	const refreshFlag = useSelector(selectIsRefresh); //дописать

	// dispatch(setEditData(text));
	const handleDeleteClick = async (event) => {
		event.preventDefault();
		try {
			await fetch(`http://localhost:3005/list/${id}`, {
				method: 'DELETE',
			});
		} catch (err) {
			console.log(err);
		} finally {
			dispatch(setRefreshFlag());
			console.log('Second:', refreshFlag);

			// refresh();
		}
	};

	const handleEditBlur = async () => {
		let newText = editData;
		if (newText === null) {
			return;
		} else if (newText) {
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
			} finally {
				dispatch(setRefreshFlag());
				// refresh();
			}
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
