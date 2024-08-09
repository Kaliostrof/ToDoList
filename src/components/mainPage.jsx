import styles from './mainPage.module.css';
import { AddTask } from './AddTask';
import { SearchingTask } from './SearchingTask';
import { AppContext } from '../context';
import { Card } from './card/Card';
import { useContext, useState } from 'react';

export const MainPage = ({ isLoading }) => {
	const { isSorting, toDo } = useContext(AppContext);
	const [searchingData, setSearchingData] = useState('');

	const onValueSearchingChange = ({ target }) => {
		setSearchingData(target.value);
	};

	// function debounce(func, delay = 1500) {
	// 	let timeout;
	// 	return (arg) => {
	// 		clearTimeout(timeout);
	// 		timeout = setTimeout(() => {
	// 			func(arg);
	// 		}, delay);
	// 	};
	// }

	const toDos = toDo.map((list) => {
		return <Card key={list.id} id={list.id} text={list.text} />;
	});

	const sortedCards = isSorting
		? [...toDo]
				.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase))
				.map((list) => {
					return <Card key={list.id} id={list.id} text={list.text} />;
				})
		: toDos;

	const filteredCards = searchingData
		? [...toDo]
				.filter((list) => {
					return list.text.toLowerCase().includes(searchingData.toLowerCase());
				})
				.map((list) => {
					return <Card key={list.id} id={list.id} text={list.text} />;
				})
		: sortedCards;

	return (
		<>
			<>
				<AddTask />
				<SearchingTask
					searchingData={searchingData}
					onValueSearchingChange={onValueSearchingChange}
				/>
			</>
			<>{(isLoading && <div className={styles.loader}></div>) || filteredCards}</>
		</>
	);
};
