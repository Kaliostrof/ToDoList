import { useContext } from 'react';
import { AddTask } from '../AddTask';
import { DeleteTask } from './DeleteTask';
import { EditTask } from './EditTask';
import styles from './List.module.css';
import { CardContext } from '../context';

export const List = () => {
	const { id, text } = useContext(CardContext);
	return (
		<div className={styles.list} key={id} id={id}>
			<input
				className={styles['list-input']}
				placeholder="Добавьте задачу"
				id={id}
				type="text"
				name="text"
				value={text}
				disabled={!AddTask.isUpdating}
			></input>
			{/* <div text={list.text}>
								{list.id}. {list.text}{' '}
							</div> */}
			<form>
				<DeleteTask />
				<EditTask />
			</form>
		</div>
	);
};
