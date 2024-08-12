import styles from './App.module.css';
import { useEffect } from 'react';
import { MainPage } from './components/mainPage';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setToDos } from './actions';
import { selectIsLoading, selectIsRefresh } from './selectors';

export const App = () => {
	// const [toDo, setToDo] = useState([]);
	// const [inputData, setInputData] = useState('');
	// const [isLoading, setIsLoading] = useState(false);
	// const [refreshFlag, setRefreshFlag] = useState(false);
	// const [searchingData, setSearchingData] = useState('');
	// const [isSorting, setIsSorting] = useState(false);

	// const refresh = () => {
	// 	setRefreshFlag(!refreshFlag);
	// };
	const dispatch = useDispatch();
	const refreshFlag = useSelector(selectIsRefresh);

	useEffect(() => {
		// setIsLoading(true);
		dispatch(setIsLoading());
		dispatch(setToDos());
		// .finally(() => , setIsLoading(false));
		dispatch(setIsLoading());
	}, [refreshFlag, dispatch]);

	const isLoading = useSelector(selectIsLoading);

	return (
		<div className={styles.app}>
			<h2>ToDo's List:</h2>
			<MainPage isLoading={isLoading} />
		</div>
	);
};
