import styles from './BtnTask.module.css';

export const DeleteTask = ({ refresh }) => {
	const onDeleteClick = (event) => {
		event.preventDefault();
		const editElem = event.target.closest('div');
		const editIndex = editElem.id;
		fetch(`http://localhost:3005/list/${editIndex}`, {
			method: 'DELETE',
		})
			.then((rawResponce) => {
				rawResponce.json();
			})
			.then((responce) => {
				console.log('Задача удалена', responce);
				refresh();
			});
	};

	return (
		<button className={styles['list-btn']} onClick={onDeleteClick}>
			Удалить
		</button>
	);
};
