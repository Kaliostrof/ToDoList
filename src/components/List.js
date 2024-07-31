import { DeleteTask } from './DeleteTask';
import { EditTask } from './EditTask';
import styles from './List.module.css';
import { useParams, NavLink } from 'react-router-dom';

export const List = ({ toDo, onValueInputChange, refresh, NotFound }) => {
	const objToDo = {};
	toDo.forEach((list) => {
		const text = list.text;
		objToDo[list.id] = { text };
	});

	const getCard = (id) => objToDo[id];
	const params = useParams();

	const taskCard = getCard(params.id);

	if (!taskCard) {
		return <NotFound />;
	}

	const { text, id } = taskCard;
	console.log('Проверка', objToDo);

	return (
		<div className={styles.card} key={id} id={id}>
			<div
				className={styles['card-text']}
				id={id}
				type="text"
				name="text"
				value={text}
				onChange={onValueInputChange}
			>
				{text}
			</div>

			<form className={styles['card-btn']}>
				<DeleteTask refresh={refresh} />
				<EditTask refresh={refresh} />
			</form>
			<NavLink to={'/'}>На главную</NavLink>
		</div>
	);
};
