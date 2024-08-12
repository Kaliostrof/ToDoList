export const setIsLoading = () => ({
	type: 'SET_IS_LOADING',
});

export const setToDos = () => (dispatch) =>
	fetch('http://localhost:3005/list')
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: 'SET_TODOS',
				payload: json,
			});
		});

export const setSearchingData = (data) => ({
	type: 'SET_SEARCHING_DATA',
	payload: data,
});

export const setIsCreating = () => ({
	type: 'SET_IS_CREATING',
});

export const setInputData = (inputData) => ({
	type: 'SET_INPUT_DATA',
	payload: inputData,
});

export const setIsSorting = () => ({
	type: 'SET_IS_SORTING',
});

export const setRefreshFlag = () => ({
	type: 'SET_REFRESH_FLAG',
});

export const setEditData = (editData) => ({
	type: 'SET_EDIT_DATA',
	payload: editData,
});
