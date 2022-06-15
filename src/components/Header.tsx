import { useFormik } from 'formik';
import { useAppDispatch } from '../app/hooks';
import { addNewTask } from '../app/reducers/todoReducer';
import '../index.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      value: ''
    },
    onSubmit: (values: valuesType, { resetForm }) => {
      const newTask = {
        id: Date.now(),
        description: values.value,
        completed: false,
        isEdit: false
      }
      dispatch(addNewTask(newTask));
      resetForm();
    },
  });

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={formik.handleSubmit} >
        <input
          name='value'
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={formik.values.value}
          onChange={formik.handleChange}
          autoFocus
        />
      </form>
    </header>
  )
}

export default Header

interface valuesType {
  value: string
}