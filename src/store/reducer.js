import { ACTION_TYPE } from '../constants';

export const initialAppState = {
	isLoading: true,
	toDos: [],
};

export const appReducer = (state = initialAppState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_IS_LOADING: {
			return {
				...state,
				isLoading: false,
			};
		}
		case ACTION_TYPE.CREATE_TODO: {
			return {
				...state,
				toDos: [...state.toDos, payload],
			};
		}
		case ACTION_TYPE.READ_TODOS: {
			return {
				...state,
				toDos: [...payload],
			};
		}
		case ACTION_TYPE.DELETED_TODO: {
			return {
				...state,
				toDos: [...state.toDos].filter((todo) => {
					return todo.id !== payload;
				}),
			};
		}
		case ACTION_TYPE.UPDATE_TODO: {
			return {
				...state,
				toDos: [...state.toDos].map((todo) => {
					return todo.id === payload.id ? (todo = payload) : todo;
				}),
			};
		}
		default:
			return state;
	}
};
