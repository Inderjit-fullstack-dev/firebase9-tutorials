import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { DB } from "../../config/firebase.config";

function TodoForm({ selectedTodo, setSelectedTodo }) {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (selectedTodo && selectedTodo.title) {
      setTodo(selectedTodo.title);
    }
  }, [selectedTodo]);

  const handleClick = async () => {
    if (!todo) return false;

    setLoading(true);
    if (!selectedTodo) {
      console.log("adding");
      const addedTodo = await addDoc(collection(DB, "todos"), {
        title: todo,
        created: serverTimestamp(),
      });
      setLoading(false);
      if (addedTodo && addedTodo?.id) {
        setTodo("");
        inputRef.current.focus();
      }
    } else {
      console.log("updating");
      const docRef = doc(DB, "todos", selectedTodo.id);
      setTodo("");
      await updateDoc(docRef, {
        title: todo,
      });
      setLoading(false);
      setSelectedTodo(null);
    }
  };
  return (
    <div className="todo-form-container">
      <input
        ref={inputRef}
        type="text"
        name="todo"
        placeholder="What you have to do today?"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleClick} disabled={loading}>
        {!selectedTodo && (loading ? "Adding..." : "Add")}
        {selectedTodo && (loading ? "Updating..." : "Update")}
      </button>
    </div>
  );
}

export default TodoForm;
