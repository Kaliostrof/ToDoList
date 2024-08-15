export const initialAppState = {
	isLoading: true,
	toDos: [],
};

export const initialFiltredState = {
	isSorting: false,
	searchingData: '',
	searchingInput: '',
};

export const initialAddState = {
	inputData: '',
	isCreating: false,
};

export const initialUpdateState = {
	isRefreshFlag: false,
	editData: '',
};

export const appReducer = (state = initialAppState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_IS_LOADING': {
			return {
				...state,
				isLoading: false,
			};
		}
		case 'SET_TODOS': {
			return {
				...state,
				toDos: [...payload],
			};
		}
		case 'SET_DELETE': {
			return {
				...state,
				toDos: state.toDos.filter((todo) => {
					return todo.id !== payload;
				}),
			};
		}
		// case 'SET_EDIT': {
		// 	return {
		// 		...state,
		// 		toDos: state.toDos.map((todo) => {
		// 			if (todo.id !== payload.id) return (todo.text = payload.text);
		// 		}),
		// 	};
		// }
		default:
			return state;
	}
};

export const filterReducer = (state = initialFiltredState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_SEARCHING_DATA': {
			return {
				...state,
				searchingData: payload,
			};
		}
		case 'SET_SEARCHING_INPUT': {
			return {
				...state,
				searchingInput: payload,
			};
		}
		case 'SET_IS_SORTING': {
			return {
				...state,
				isSorting: !state.isSorting,
			};
		}
		default:
			return state;
	}
};

export const addReducer = (state = initialAddState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_INPUT_DATA': {
			return {
				...state,
				inputData: payload,
			};
		}
		case 'SET_IS_CREATING': {
			return {
				...state,
				isCreating: !state.isCreating,
			};
		}
		default:
			return state;
	}
};

export const updateReducer = (state = initialUpdateState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_REFRESH_FLAG': {
			return {
				...state,
				isRefreshFlag: !state.isRefreshFlag,
			};
		}
		case 'SET_EDIT_DATA': {
			return {
				...state,
				editData: payload,
			};
		}
		default:
			return state;
	}
};
