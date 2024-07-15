import { AddTask } from './AddTask';
import { DeleteTask } from './DeleteTask';
import { EditTask } from './EditTask';
import styles from './List.module.css';

export const List = ({ id, text, onValueInputChange, refresh }) => {
	return (
		<div className={styles.list} key={id} id={id}>
			<input
				className={styles['list-input']}
				placeholder="Добавьте задачу"
				id={id}
				type="text"
				name="text"
				value={text}
				onChange={onValueInputChange}
				disabled={!AddTask.isUpdating}
			></input>
			{/* <div text={list.text}>
								{list.id}. {list.text}{' '}
							</div> */}
			<form>
				<DeleteTask refresh={refresh} />
				<EditTask refresh={refresh} />
			</form>
		</div>
	);
};
