import { useContext } from 'react';
import styles from './SearchingTask.module.css';
import { AppContext } from '../context';

export const SearchingTask = ({ onValueSearchingChange, searchingData }) => {
	const { refresh, isSorting, setIsSorting } = useContext(AppContext);

	const onSortClick = (e) => {
		e.preventDefault();
		setIsSorting(!isSorting);
		refresh();
		console.log(isSorting);
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
