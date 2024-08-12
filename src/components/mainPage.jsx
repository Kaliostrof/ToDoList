import styles from './mainPage.module.css';
import { AddTask } from './AddTask';
import { SearchingTask } from './SearchingTask';
import { List } from './card/List';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSorting, selectSearchingData, selectToDos } from '../selectors';
import { setSearchingData } from '../actions';

export const MainPage = ({ isLoading }) => {
	const toDo = useSelector(selectToDos);
	const isSorting = useSelector(selectIsSorting);
	// const [searchingData, setSearchingData] = useState('');
	const searchingData = useSelector(selectSearchingData);
	const dispatch = useDispatch();

	const onValueSearchingChange = ({ target }) => {
		dispatch(setSearchingData(target.value));
		// setSearchingData(target.value);
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
		return <List key={list.id} id={list.id} text={list.text} />;
	});

	const sortedCards = isSorting
		? [...toDo]
				.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase))
				.map((list) => {
					return <List key={list.id} id={list.id} text={list.text} />;
				})
		: toDos;

	const filteredCards = searchingData
		? [...toDo]
				.filter((list) => {
					return list.text.toLowerCase().includes(searchingData.toLowerCase());
				})
				.map((list) => {
					return <List key={list.id} id={list.id} text={list.text} />;
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
