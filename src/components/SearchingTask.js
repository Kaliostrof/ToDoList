import styles from './SearchingTask.module.css';

export const SearchingTask = ({ onValueSearchingChange, onSort, searchingData }) => {
	const onSortClick = (e) => {
		e.preventDefault();
		onSort();
	};

	return (
		<div className={styles.search}>
			<form className={styles['search-form']}>
				<input
					className={styles['search-input']}
					placeholder="Что найти?"
					type="text"
					name="text"
					value={searchingData}
					onChange={onValueSearchingChange}
				></input>
				<button className={styles['sort-button']} onClick={onSortClick}>
					Отсортировать
				</button>
			</form>
		</div>
	);
};
