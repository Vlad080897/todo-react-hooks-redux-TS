import { useFormik } from 'formik'
import React, { FocusEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { completeTask, deleteTask, toggleEditMode, updateValue } from '../app/reducers/todoReducer'
import { TaskType } from '../types/types'

const Task: React.FC<CurrentTaskType> = ({ task }) => {
  const { id, completed, description, isEdit } = task
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isBlur, setIsBlur] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      value: description
    },
    onSubmit: (values: { value: string }) => {
      setIsBlur(false);
      dispatch(updateValue(id, values.value))
    }
  });

  const handleDelete = () => {
    dispatch(deleteTask(id));
  }

  const handleComplete = () => {
    dispatch(completeTask(id));
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (isBlur) {
      dispatch(updateValue(id, formik.values.value))
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [isEdit])

  const handleToggle = () => {
    setIsBlur(true)
    dispatch(toggleEditMode(id, description));
  }
  return (
    <>
      <li className={`${isEdit ? 'editing' : ''}`}>
        <div className="view">
          <input
            readOnly
            type="checkbox"
            className="toggle"
            checked={completed ? true : false}
            onChange={handleComplete}
          />
          <label
            className={`description ${completed ? 'completed' : ''}`}
            onDoubleClick={handleToggle}
          >
            {description}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={handleDelete}
          />
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <input
            name='value'
            type="text"
            className="edit"
            value={formik.values.value}
            onChange={formik.handleChange}
            ref={inputRef}
            onBlur={handleBlur}
          />
        </form>
      </li >
    </>
  )
}

export default Task

interface CurrentTaskType {
  task: TaskType
}