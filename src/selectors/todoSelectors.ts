import { RootState } from "../app/store";

export const getTasks = (state: RootState) => {
    return state.todo.tasks;
};

export const getItemsLeft = (state: RootState) => {
    return state.todo.itemsLeft;
}

export const getLoading = (state: RootState) => {
    return state.todo.loading;
};

export const getPath = (state: RootState) => {
    return state.todo.path;
};

export const getAllTasksLength = (state: RootState) => {
    return state.todo.tasks.length
}