import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AppContext } from './context';
import { MainPage } from './components/mainPage';

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

	return (
		<div className={styles.app}>
			<h2>ToDo's List:</h2>
			<AppContext.Provider
				value={{
					searchingData,
					setSearchingData,
					isSorting,
					setIsSorting,
					inputData,
					setInputData,
					onValueInputChange,
					refresh,
				}}
			>
				<MainPage toDo={toDo} isLoading={isLoading} />
			</AppContext.Provider>
		</div>
	);
};
