import { all } from "../routes";
import { todoApi } from './../../api/todo-api';
import { TaskType } from './../../types/types';
import { actions, GETTING_TASKS, SET_TASKS, UPDATE_PATH } from './../actions/index';
import { AppThunk } from './../store';

const initialState = {
  tasks: [] as TaskType[],
  itemsLeft: 0,
  path: all,
  loading: false
}

const todoReducer = (state: initialStateType = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case GETTING_TASKS: {
      return {
        ...state,
        loading: true
      }
    }
    case SET_TASKS: {
      return {
        ...state,
        tasks: [...action.newTasks],
        itemsLeft: action.itemsLeft,
        loading: false
      }
    }
    case UPDATE_PATH: {
      return {
        ...state,
        path: action.path
      }
    }

    default: return state
  }
}

export default todoReducer;

export const getTasks = (): AppThunk => async (dispatch, getState) => {
  dispatch(actions.gettingTasks());
  const response = (await todoApi.getTasks()).tasks;
  const itemsLeft = response.filter(t => t.completed === false).length;
  dispatch(actions.setTasks({ newTasks: response, itemsLeft }));
};

export const addNewTask = (newTask: TaskType): AppThunk => async (dispatch, getState) => {
  dispatch(actions.gettingTasks());
  const newTasks = [...getState().todo.tasks, newTask];
  await todoApi.updateTasks(newTasks);
  dispatch(getTasks());
};

export const deleteTask = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(actions.gettingTasks());
  const newTasks = getState().todo.tasks.filter(t => t.id !== id);
  await todoApi.updateTasks(newTasks);
  dispatch(getTasks());
};

export const completeTask = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(actions.gettingTasks());
  const newTasks = getState().todo.tasks.map(t => {
    if (t.id === id) {
      return {
        ...t,
        completed: !t.completed
      };
    };
    return t
  })
  await todoApi.updateTasks(newTasks);
  dispatch(getTasks())
}

export const clearCompleted = (): AppThunk => async (dispatch, getState) => {
  dispatch(actions.gettingTasks());
  const newTasks = getState().todo.tasks.filter(t => t.completed !== true);
  await todoApi.updateTasks(newTasks);
  dispatch(getTasks());
}

export const checkAll = (): AppThunk => async (dispatch, getState) => {
  dispatch(actions.gettingTasks());
  const currentTasks = getState().todo.tasks;
  const haveNotCompleted = currentTasks.find(t => t.completed === false);
  const newTasks = currentTasks.map(t => {
    if (haveNotCompleted) {
      return {
        ...t,
        completed: true,
      }
    }
    return {
      ...t,
      completed: false,
    };
  });
  await todoApi.updateTasks(newTasks);
  dispatch(getTasks());
}

export const updatePathThunk = (path: string): AppThunk => (dispatch) => {
  dispatch(actions.updatePath(path))
}

export const toggleEditMode = (id: number, description: string): AppThunk => async (dispatch, getState) => {
  const newTasks = getState().todo.tasks.map(t => {
    if (t.id === id) {
      return {
        ...t,
        isEdit: !t.isEdit,
        description: description
      }
    }
    return t
  })
  await todoApi.updateTasks(newTasks);
  dispatch(getTasks());
}

export const updateValue = (id: number, description: string): AppThunk => async (dispatch, getState) => {
  const newTasks = getState().todo.tasks.map(t => {
    if (t.id === id) {
      return {
        ...t,
        isEdit: !t.isEdit,
        description: description
      }
    }
    return t
  })
  await todoApi.updateTasks(newTasks);
  dispatch(getTasks());
}


type initialStateType = typeof initialState

// infer type of each Action
type InferValueType<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsTypes = ReturnType<InferValueType<typeof actions>>;