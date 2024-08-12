import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchingTask.module.css';
import { selectSearchingData } from '../selectors';
import { setIsSorting } from '../actions';

export const SearchingTask = ({ onValueSearchingChange }) => {
	const searchingData = useSelector(selectSearchingData);
	const dispatch = useDispatch();

	const onSortClick = (e) => {
		e.preventDefault();
		dispatch(setIsSorting());
		// setIsSorting(!isSorting);
		// refresh();
		// console.log(isSorting);
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
