import React, {Component} from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./List.css";
import { geolocated } from 'react-geolocated';

const List = () => {

  //for geolocation coords
    const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
    //coords to dispaly, usestate = center on pollock country park
    const [lng, setLng] = useState(-4.3152);
    const [lat, setLat] = useState(55.8275);
    const [zoom, setZoom] = useState(14);
  
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

          // adds geolocate control 
          map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            })
        );

  //displays items
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  //CREATE
  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
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

          <h2>Report Issue</h2>

          <input
            name="todo"
            type="text"
            placeholder="Report an issue"
            value={todo}
            onChange={handleInputChange}
          />
          <input
          name="issuelocation"
          type="text"
          value={lng}
          onChange={handleInputChange}
          />
           <button className="button-3" type="submit">Add</button>
        </form>
      )}



      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button className="button-3" onClick={() => handleEditClick(todo)}>Edit</button>
            <button className="button-3" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    );
}

export default List;