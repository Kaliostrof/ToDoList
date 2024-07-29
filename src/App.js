import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AddTask } from './components/AddTask';

import { SearchingTask } from './components/SearchingTask';
import { List } from './components/List';
import { AppContext } from './context';

export const App = () => {
	const [toDo, setToDo] = useState([]);
	const [inputData, setInputData] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [refreshFlag, setRefreshFlag] = useState(false);
	const [searchingData, setSearchingData] = useState('');
	const [isSorting, setIsSorting] = useState(false);

	const refresh = () => {
		setRefreshFlag(!refreshFlag);
	};
	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/list')
			.then((response) => response.json())
			.then((json) => {
				setToDo(json);
				console.log(json);
			})
			.finally(() => setIsLoading(false));
	}, [refreshFlag]);

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
					toDo.map((list) => {
						const id = list.id;
						const text = list.text;
						return (
							<AppContext.Provider value={{ id, text }}>
								<List refresh={refresh} />
							</AppContext.Provider>
						);
					})
				) : (
					toDo
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
							const id = list.id;
							const text = list.text;
							return (
								<AppContext.Provider value={{ id, text }}>
									<List refresh={refresh} />
								</AppContext.Provider>
							);
						})
				)
			) : (
				toDo
					.filter((list) => {
						return list.text
							.toLowerCase()
							.includes(searchingData.toLowerCase());
					})
					.map((list) => {
						const id = list.id;
						const text = list.text;
						return (
							<AppContext.Provider value={{ id, text }}>
								<List refresh={refresh} />
							</AppContext.Provider>
						);
					})
			)}
		</div>
	);
};
