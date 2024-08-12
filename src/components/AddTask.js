import styles from './AddTask.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectInputData, selectIsCreating } from '../selectors';
import { setInputData, setIsCreating, setRefreshFlag } from '../actions';

export const AddTask = () => {
	// const [isCreating, setIsCreating] = useState(false);
	// const { refresh } = useContext(AppContext);
	// const [inputData, setInputData] = useState('');
	const dispatch = useDispatch();
	const inputData = useSelector(selectInputData);
	const isCreating = useSelector(selectIsCreating);

	const onValueInputChange = ({ target }) => {
		dispatch(setInputData(target.value));
		// setInputData(target.value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		dispatch(setIsCreating());
		// setIsCreating(true);

		if (inputData) {
			try {
				await fetch('http://localhost:3005/list', {
					method: 'POST',
					headers: { 'Content-type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						text: inputData,
					}),
				});
			} catch (err) {
				console.log(err);
			} finally {
				dispatch(setIsCreating());
				dispatch(setInputData(''));
				dispatch(setRefreshFlag());

				// setIsCreating(false);
				// setInputData('');
				// refresh();
			}
		} else {
			alert('Error!');
			dispatch(setIsCreating());
			// setIsCreating(false);
		}
	};

	return (
		<div className={styles.add}>
			<form className={styles['add-form']} onSubmit={onSubmit}>
				<input
					className={styles['add-input']}
					placeholder="Добавьте задачу"
					type="text"
					name="text"
					value={inputData}
					onChange={onValueInputChange}
				></input>
				<button className={styles['add-button']} disabled={isCreating !== false}>
					Добавить
				</button>
			</form>
		</div>
	);
};
