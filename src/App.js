import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AddTask } from './components/AddTask';
import { Routes, Route } from 'react-router-dom';

import { SearchingTask } from './components/SearchingTask';
import { List } from './components/List';
import { MainPage } from './components/mainPage';

// function debounce(func, delay = 1500) {
// 	let timeout;
// 	return (arg) => {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => {
// 			func(arg);
// 		}, delay);
// 	};
// }

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

	const onValueInputChange = ({ target }) => {
		setInputData(target.value);
	};

	const onValueSearchingChange = ({ target }) => {
		setSearchingData(target.value);
	};

	const NotFound = () => (
		<div className={styles.notFound}>Данная задача отсутствует...</div>
	);

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
			<MainPage
				toDo={toDo}
				isLoading={isLoading}
				searchingData={searchingData}
				isSorting={isSorting}
			/>
			<Routes>
				<Route path="/" element />
				<Route
					path="/:id"
					element={
						<List
							NotFound={NotFound}
							toDo={toDo}
							onValueInputChange={onValueInputChange}
							refresh={refresh}
						/>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};
