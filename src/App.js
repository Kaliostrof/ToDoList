import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
				console.log(json); //Почему отсортирован?
				setToDo(json);
			})
			.finally(() => setIsLoading(false));
	}, [refreshFlag]);

	const onValueInputChange = ({ target }) => {
		setInputData(target.value);
	};

	const NotFound = () => (
		<div className={styles.notFound}>Данная задача отсутствует...</div>
	);

	return (
		<div className={styles.app}>
			<h2>ToDo's List=3</h2>

			<Routes>
				<Route
					path="/"
					element={
						<MainPage
							toDo={toDo}
							isLoading={isLoading}
							searchingData={searchingData}
							setSearchingData={setSearchingData}
							isSorting={isSorting}
							setIsSorting={setIsSorting}
							inputData={inputData}
							setInputData={setInputData}
							onValueInputChange={onValueInputChange}
							refresh={refresh}
						/>
					}
				/>
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
				<Route path="/404" element={<NotFound />} />
			</Routes>
		</div>
	);
};
