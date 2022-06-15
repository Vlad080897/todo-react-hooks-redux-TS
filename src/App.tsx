import React, { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { getTasks } from './app/reducers/todoReducer';
import Footer from './components/Footer';
import Header from './components/Header';
import Todo from './components/Todo';

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  return (
    <section className="todoapp">
      <Header />
      <Todo />
      <Footer />
    </section>
  );
}

export default App;
