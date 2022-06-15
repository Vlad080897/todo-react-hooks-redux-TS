import { TaskType } from './../types/types';
import { instance } from './api';

export const todoApi = {
    getTasks: () => {
        return instance.get<responseType>('/todo').then(res => res.data)
    },
    updateTasks: (newTasks: TaskType[]) => {
        return instance.put('/todo', { tasks: [...newTasks] })
    },
}

type responseType = {
    tasks: TaskType[]
}