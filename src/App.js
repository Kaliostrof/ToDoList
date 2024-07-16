import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AddTask } from './components/AddTask';

import { SearchingTask } from './components/SearchingTask';
import { List } from './components/List';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

export const App = () => {
	const [toDo, setToDo] = useState([]);
	const [inputData, setInputData] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [refreshFlag, setRefreshFlag] = useState(false);
	const [searchingData, setSearchingData] = useState('');
	const [isSorting, setIsSorting] = useState(false);

	const refresh = () => {
		setRefreshFlag(!refreshFlag);
	};
	useEffect(() => {
		const todosRef = ref(db, 'list');

		return onValue(todosRef, (snapshot) => {
			const loadedList = snapshot.val() || {};
			setToDo(loadedList);
			console.log(Object.entries(toDo));
			setIsLoading(false);
		});
	}, []);

	// function debounce(func, delay = 1500) {
	// 	let timeout;
	// 	return (arg) => {
	// 		clearTimeout(timeout);
	// 		timeout = setTimeout(() => {
	// 			func(arg);
	// 		}, delay);
	// 	};
	// }

	const onValueInputChange = ({ target }) => {
		setInputData(target.value);
	};

	const onValueSearchingChange = ({ target }) => {
		setSearchingData(target.value);
	};

	return (
		<div className={styles.app}>
			<h2>ToDo's List:</h2>
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
			{isLoading ? (
				<div className={styles.loader}></div>
			) : !searchingData ? (
				!isSorting ? (
					Object.entries(toDo).map(([id, { text }]) => {
						return (
							<List
								id={id}
								text={text}
								onValueInputChange={onValueInputChange}
								refresh={refresh}
							/>
						);
					})
				) : (
					Object.entries(toDo)
						.sort((a, b) => {
							console.log(a, b);
							if (a[1].text.toLowerCase() < b[1].text.toLowerCase()) {
								console.log(a.text, b.text);
								return -1;
							}
							if (a[1].text.toLowerCase() > b[1].text.toLowerCase()) {
								return 1;
							}
							return 0;
						})
						.map(([id, { text }]) => {
							return (
								<List
									id={id}
									text={text}
									onValueInputChange={onValueInputChange}
									refresh={refresh}
								/>
							);
						})
				)
			) : (
				Object.entries(toDo)
					.filter(([id, { text }]) => {
						return text.toLowerCase().includes(searchingData.toLowerCase());
					})
					.map(([id, { text }]) => {
						return (
							<List
								id={id}
								text={text}
								onValueInputChange={onValueInputChange}
								refresh={refresh}
							/>
						);
					})
			)}
		</div>
	);
};
