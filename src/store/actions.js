import { FETCH_URL } from '../constants';
import { ACTION_TYPE } from '../constants/action-type';

export const setIsLoading = (flag) => ({
	type: ACTION_TYPE.SET_IS_LOADING,
	payload: flag,
});

export const readToDos = () => async (dispatch) => {
	dispatch(setIsLoading(true));
	fetch(FETCH_URL)
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: ACTION_TYPE.READ_TODOS,
				payload: json,
			});
		});
	dispatch(setIsLoading(false));
};

export const addToDo = (inputData) => async (dispatch) => {
	try {
		const responce = await fetch(FETCH_URL, {
			method: 'POST',
			headers: { 'Content-type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: inputData,
			}),
		});
		const newToDo = await responce.json();
		dispatch({ type: ACTION_TYPE.CREATE_TODO, payload: newToDo });
	} catch (err) {
		console.log(err);
	}
};

export const updateToDo = (updatedToDo) => async (dispatch) => {
	await fetch(FETCH_URL + updatedToDo.id, {
		method: 'PUT',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			text: updatedToDo.text,
		}),
	});
	dispatch({ type: ACTION_TYPE.UPDATE_TODO, payload: updatedToDo });
};

export const deleteToDo =
	({ id, text }) =>
	async (dispatch) => {
		try {
			dispatch({ type: ACTION_TYPE.DELETED_TODO, payload: id });
			await fetch(FETCH_URL + id, {
				method: 'DELETE',
			});
		} catch (err) {
			console.log(err);
			const newToDo = { id, text };
			dispatch({ type: ACTION_TYPE.CREATE_TODO, payload: newToDo });
		}
	};

export const setIsSorting = () => ({
	type: 'SET_IS_SORTING',
});
