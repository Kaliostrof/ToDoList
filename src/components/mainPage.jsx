import styles from './mainPage.module.css';
import { AddTask } from './AddTask';
import { SearchingTask } from './SearchingTask';
import { AppContext } from '../context';
import { List } from './card/List';
import { useContext } from 'react';
import { CardContext } from './context';

export const MainPage = ({ toDo, isLoading }) => {
	const { searchingData, setSearchingData, isSorting } = useContext(AppContext);
	const onValueSearchingChange = ({ target }) => {
		setSearchingData(target.value);
	};

	const mappedLink = toDo.map((list) => {
		const id = list.id;
		const text = list.text;
		return (
			<CardContext.Provider value={{ id, text }}>
				<List />
			</CardContext.Provider>
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
			const id = list.id;
			const text = list.text;
			return (
				<CardContext.Provider value={{ id, text }}>
					<List />
				</CardContext.Provider>
			);
		});

	const filteredLink = [...toDo]
		.filter((list) => {
			return list.text.toLowerCase().includes(searchingData.toLowerCase());
		})
		.map((list) => {
			const id = list.id;
			const text = list.text;
			return (
				<CardContext.Provider value={{ id, text }}>
					<List />
				</CardContext.Provider>
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
				<AddTask />
				<SearchingTask onValueSearchingChange={onValueSearchingChange} />
			</>
			<>
				{(isLoading && <div className={styles.loader}></div>) ||
					displayConditions()}
			</>
		</>
	);
};
