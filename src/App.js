import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AppContext } from './context';
import { MainPage } from './components/mainPage';

export const App = () => {
	const [toDo, setToDo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshFlag, setRefreshFlag] = useState(false);
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

	return (
		<div className={styles.app}>
			<h2>ToDo's List:</h2>
			<AppContext.Provider
				value={{
					isSorting,
					setIsSorting,
					refresh,
					toDo,
				}}
			>
				<MainPage isLoading={isLoading} />
			</AppContext.Provider>
		</div>
	);
};
