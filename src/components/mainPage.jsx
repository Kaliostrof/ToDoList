import styles from './mainPage.module.css';
import { AddTask } from './AddTask';
import { SearchingTask } from './SearchingTask';
import { List } from './card/List';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectToDos } from '../store/selectors';
import { useRef, useState } from 'react';
import { debounce } from '../utils';

export const MainPage = () => {
	const toDo = useSelector(selectToDos);
	const [searchingData, setSearchingData] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [isSorting, setIsSorting] = useState(false);
	const isLoading = useSelector(selectIsLoading);

	const onChange = (text) => {
		setSearchInput(text);
	};
	const debounceSearching = useRef(debounce(onChange, 1500)).current;

	const onValueSearchingChange = ({ target }) => {
		setSearchingData(target.value); // тут просто меняем состояние инпута
		debounceSearching(target.value); // а здесь уже делаем запрос с debounce
	};

	const toDos = [...toDo];

	const sortedCards = isSorting
		? [...toDo].sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase))
		: toDos;

	const filteredCards = searchInput
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
					onSort={() => setIsSorting((prev) => !prev)}
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
