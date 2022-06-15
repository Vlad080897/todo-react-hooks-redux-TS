import { TaskType } from "../../types/types";

export const GETTING_TASKS = 'TODO/GETTING_TASKS';
export const SET_TASKS = 'TODO/SET_TASKS';
export const UPDATE_PATH = 'TODO/UPDATE_PATH';

export const actions = {
    gettingTasks: () => {
      return {
        type: GETTING_TASKS
      } as const
    },
    setTasks: ({ newTasks, itemsLeft }: { newTasks: TaskType[], itemsLeft: number }) => {
      return {
        type: SET_TASKS,
        newTasks,
        itemsLeft
      } as const
    },
    updatePath: (path: string) => {
      return {
        type: UPDATE_PATH,
        path
      } as const
    }
  }