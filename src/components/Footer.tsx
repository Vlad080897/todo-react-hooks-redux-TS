import { MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/hooks'
import { clearCompleted, updatePathThunk } from '../app/reducers/todoReducer'
import { active, all, completed } from '../app/routes'
import { getAllTasksLength, getItemsLeft, getPath, getTasks } from '../selectors/todoSelectors'

const Footer = () => {
  const itemsLeft = useSelector(getItemsLeft);
  const haveTasks = useSelector(getAllTasksLength);
  const haveCompleted = useSelector(getTasks).filter(t => t.completed === true).length;
  const path = useSelector(getPath);
  const dispatch = useAppDispatch();

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };
  const updatePath = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const path = e.currentTarget.innerText;
    dispatch(updatePathThunk(path))
  }

  return (
    <>
      {haveTasks ? <footer className="footer" id="footer_info_wrapper">
        <span className="todo-count">{`${itemsLeft} items left`}</span>
        <ul className="filters">
          <li>
            <button
              type="button"
              className={`${path === all ? 'activeButton' : ''}`}
              onClick={(e) => updatePath(e)}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${path === active ? 'activeButton' : ''}`}
              onClick={(e) => updatePath(e)}
            >
              Active
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${path === completed ? 'activeButton' : ''}`}
              onClick={(e) => updatePath(e)}
            >
              Completed
            </button>
          </li>
        </ul>
        <button
          type="button"
          className={`${haveCompleted ? 'clear-completed visible' : 'hidden'}`}
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      </footer> : null}
    </>

  )
}

export default Footer