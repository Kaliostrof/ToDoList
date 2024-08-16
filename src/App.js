import styles from './App.module.css';
import { useEffect } from 'react';
import { MainPage } from './components/mainPage';
import { useDispatch } from 'react-redux';
import { readToDos } from './store/actions';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(readToDos());
	}, []);

	return (
		<div className={styles.app}>
			<h2>ToDo's List:</h2>
			<MainPage />
		</div>
	);
};
