export const selectIsRefresh = (state) => state.updateState.isRefreshFlag;
export const selectInputData = (state) => state.addState.inputData;
export const selectSearchingData = (state) => state.filtredState.searchingData;
export const selectEditData = (state) => state.updateState.editData;
export const selectIsLoading = (state) => state.appState.isLoading;
export const selectIsSorting = (state) => state.filtredState.isSorting;
export const selectIsCreating = (state) => state.addState.isCreating;
export const selectToDos = (state) => state.appState.toDos;
