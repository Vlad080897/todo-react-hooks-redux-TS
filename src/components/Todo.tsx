import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/hooks'
import { checkAll } from '../app/reducers/todoReducer'
import { active, completed } from '../app/routes'
import { getLoading, getPath, getTasks } from '../selectors/todoSelectors'
import { TaskType } from '../types/types'
import Task from './Task'

const Todo = () => {
  const tasks = useSelector(getTasks);
  const loading = useSelector(getLoading);
  const path = useSelector(getPath);
  const [currentTasks, setCurrentTasks] = useState<TaskType[]>([])
  const checkAllBtn = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const haveNotCompleted = tasks.find(t => t.completed === false);
  const isAllChecked = () => {
    if (checkAllBtn.current) {
      if (haveNotCompleted) {
        checkAllBtn.current.checked = false;

      }
      if (!haveNotCompleted && tasks.length) {
        const fromLocal = tasks.find(t => t.completed === false);
        if (fromLocal) {
          checkAllBtn.current.checked = false;
          return;
        };
        checkAllBtn.current.checked = true;
        return;
      };
      checkAllBtn.current.checked = false;
    }
  }

  const sortByPath = (path: string) => {
    const activeTasks = tasks.filter(t => t.completed === false);
    const completedTasks = tasks.filter(t => t.completed === true);
    if (path === active) {
      setCurrentTasks(activeTasks);
      return;
    }
    if (path === completed) {
      setCurrentTasks(completedTasks);
      return;
    }
    setCurrentTasks(tasks);
  }

  const handleCheckAll = () => {
    dispatch(checkAll());
  }

  useEffect(() => {
    isAllChecked();
  }, [tasks])

  useEffect(() => {
    sortByPath(path);
  }, [tasks, path])


  return (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        id="toggle-all"
        onChange={handleCheckAll}
        ref={checkAllBtn}
        disabled={loading ? true : false}
      />
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list" id="todos-wrapper">
        {currentTasks.map(task => {
          return (
            <Task
              key={task.id}
              task={task}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default Todo