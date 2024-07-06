import styles from './App.module.css';
import { useEffect, useState } from 'react';

export const App = () => {
	const [toDo, setToDo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((json) => {
				setToDo(json);
				console.log(json);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.app}>
			<h2>ToDo's List:</h2>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				toDo.map((list) => {
					return (
						<div className={styles.list} key={list.id}>
							{list.id}. {list.title}
						</div>
					);
				})
			)}
		</div>
	);
};
