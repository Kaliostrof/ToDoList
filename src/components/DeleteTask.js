import styles from './BtnTask.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteTask = ({ refresh }) => {
	const navigate = useNavigate();
	const params = useParams();

	const onDeleteClick = (event) => {
		event.preventDefault();
		// const editElem = event.target.closest('div');
		// const editIndex = editElem.id;
		// console.log(params.id);

		fetch(`http://localhost:3005/list/${params.id}`, {
			method: 'DELETE',
		})
			.then((rawResponce) => {
				rawResponce.json();
			})
			.then((responce) => {
				navigate('/');
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
