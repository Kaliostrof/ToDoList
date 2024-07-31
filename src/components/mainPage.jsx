import { NavLink } from 'react-router-dom';
import styles from './mainPage.module.css';

export const MainPage = ({ toDo, isLoading, searchingData, isSorting }) => {
	const mappedLink = toDo.map((list) => {
		return (
			<div className={styles.links}>
				<NavLink to={`/${list.id}`}>{list.text}</NavLink>
			</div>
		);
	});

	const sortingLink = toDo
		.sort((a, b) => {
			if (a.text.toLowerCase() < b.text.toLowerCase()) {
				return -1;
			}
			if (a.text.toLowerCase() > b.text.toLowerCase()) {
				return 1;
			}
			return 0;
		})
		.map((list) => {
			return (
				<div className={styles.links}>
					<NavLink to={`/${list.id}`}>{list.text}</NavLink>
				</div>
			);
		});

	const filteredLink = toDo
		.filter((list) => {
			return list.text.toLowerCase().includes(searchingData.toLowerCase());
		})
		.map((list) => {
			return (
				<div className={styles.links}>
					<NavLink to={`/${list.id}`}>{list.text}</NavLink>
				</div>
			);
		});

	const displayConditions = () => {
		if (searchingData) {
			return filteredLink;
		} else if (isSorting) {
			return sortingLink;
		} else {
			return mappedLink;
		}
	};

	return (
		<>{(isLoading && <div className={styles.loader}></div>) || displayConditions()}</>
	);
};
