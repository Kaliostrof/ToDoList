import { NavLink } from 'react-router-dom';
import styles from './mainPage.module.css';
import { AddTask } from './AddTask';
import { SearchingTask } from './SearchingTask';

export const MainPage = ({
	toDo,
	isLoading,
	searchingData,
	setSearchingData,
	isSorting,
	setIsSorting,
	inputData,
	setInputData,
	onValueInputChange,
	refresh,
}) => {
	const onValueSearchingChange = ({ target }) => {
		setSearchingData(target.value);
	};

	const mappedLink = toDo.map((list) => {
		return (
			<div className={styles.links}>
				<NavLink to={`/${list.id}`}>{list.text}</NavLink>
			</div>
		);
	});

	const sortingLink = [...toDo]
		.sort((a, b) => {
			if (a.text.toLowerCase() > b.text.toLowerCase()) {
				return 1;
			}
			if (a.text.toLowerCase() < b.text.toLowerCase()) {
				return -1;
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

	const filteredLink = [...toDo]
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
		if (!searchingData && !isSorting) {
			return mappedLink;
		} else if (isSorting) {
			return sortingLink;
		} else if (searchingData) {
			return filteredLink;
		}
	};

	return (
		<>
			<>
				<AddTask
					setInputData={setInputData}
					inputData={inputData}
					onValueInputChange={onValueInputChange}
					refresh={refresh}
				/>
				<SearchingTask
					onValueSearchingChange={onValueSearchingChange}
					searchingData={searchingData}
					isSorting={isSorting}
					setIsSorting={setIsSorting}
					refresh={refresh}
				/>
			</>
			<>
				{(isLoading && <div className={styles.loader}></div>) ||
					displayConditions()}
			</>
		</>
	);
};
