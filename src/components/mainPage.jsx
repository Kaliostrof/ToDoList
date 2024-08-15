import styles from './mainPage.module.css';
import { AddTask } from './AddTask';
import { SearchingTask } from './SearchingTask';
import { List } from './card/List';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSorting, selectSearchingData, selectToDos } from '../selectors';
import { setSearchingData } from '../actions';
import { useRef } from 'react';

const debounce = (func, delay) => {
	let timeout;
	return (...arg) => {
		clearTimeout(timeout);
		timeout = setTimeout(func, delay, ...arg);
	};
};

export const MainPage = ({ isLoading }) => {
	const toDo = useSelector(selectToDos);
	const isSorting = useSelector(selectIsSorting);
	// const [searchingData, setSearchingData] = useState('');
	const searchingData = useSelector(selectSearchingData);
	const dispatch = useDispatch();

	// const onChange = (text) => {
	// 	dispatch(setSearchingData(text));
	// };
	// const debounceSearching = useRef(debounce(onChange, 1500)).current;

	const onValueSearchingChange = ({ target }) => {
		dispatch(setSearchingData(target.value));
		// debounceSearching(target.value);
		console.log(target.value);
	};

	const toDos = [...toDo];

	const sortedCards = isSorting
		? [...toDo].sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase))
		: toDos;

	const filteredCards = searchingData
		? [...toDo].filter((list) => {
				return list.text.toLowerCase().includes(searchingData.toLowerCase());
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
			<>
				{(isLoading && <div className={styles.loader}></div>) ||
					filteredCards.map((list) => {
						return <List key={list.id} id={list.id} text={list.text} />;
					})}
			</>
		</>
	);
};
