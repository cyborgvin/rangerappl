import React, {Component} from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./List.css";
import { geolocated } from 'react-geolocated';
import useGeolocation from 'react-hook-geolocation'


const List = () => {

    const geolocation = useGeolocation()


    const [todos, setTodos] = useState(() => {

    //keeps track of saved todos (local)
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  //keeps track of input value
  const [todo, setTodo] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  //displays items
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //gets the input value and sets the new state when created
  function handleInputChange(e) {
    //sets new value to whats in the input box
    setTodo(e.target.value);

  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value});
    console.log(currentTodo);
  }

  //CREATE + summons submit form
  function handleFormSubmit(e) {
    //wont refresh on submit
    e.preventDefault();
    console.log(geolocation.latitude, geolocation.longitude, todos.length + 1, todo.trim())

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          lat: geolocation.latitude,
          lng: geolocation.longitude,
        }
      ]);
    }

    setTodo("");
  }

   // EDIT
  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }


  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

 

    return (
      <div className="App">

        <h2>Ranger Location</h2>
{geolocation.latitude}, {geolocation.longitude}
<br></br>
       
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit</h2>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button className="button-3" type="submit">Update</button>
          <button className="button-3" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
          
          <form onSubmit={handleFormSubmit}>

          <hr></hr>

          <h2>Report Issue</h2>

          <input
            name="todo"
            type="text"
            placeholder="Report an issue"
            value={todo}
            onChange={handleInputChange}
          />
          <br></br>
          <input
          name="lat"
          type="text"
          value={geolocation.latitude}
          />
          <br></br>
          <input
          name="lng"
          type="text"
          value={geolocation.longitude}
          />
          <br></br>
          
          

           <button className="button-3" type="submit">Add</button>
        </form>
      )}

      <hr></hr>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <br></br>
            ({todo.lat},
            {todo.lng})
            <br></br>
            <button className="button-3" onClick={() => handleEditClick(todo)}>Edit</button>
            <button className="button-3" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
            <hr></hr>
          </li>
        ))}
      </ul>
    </div>
    );
}

export default List;