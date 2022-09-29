import { useEffect, useState } from "react";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { DB } from "./config/firebase.config";
function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const todoCollectionRef = collection(DB, "todos");

  useEffect(() => {
    setLoading(true);
    const q = query(todoCollectionRef, orderBy("created", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todoList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoading(false);
      setTodos(todoList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("are you sure to delete?")) {
      if (todos.length > 0 && id != undefined && id != null) {
        await deleteDoc(doc(DB, "todos", id));
        setSelectedTodo(null);
      }
    }
  };

  return (
    <>
      <TodoForm
        total={todos.length}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
      />
      <TodoList
        data={todos}
        handleDelete={handleDelete}
        loading={loading}
        setSelectedTodo={setSelectedTodo}
      />
    </>
  );
}

export default App;
