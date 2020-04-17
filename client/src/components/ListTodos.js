import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

export default (props) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const delTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const editTodo = async (todoId) => {
  //   try {
  //     const body = {};
  //     const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  useEffect(() => {
    getTodos();
  });

  return (
    <Fragment>
      <h1>List Todos</h1>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 &&
            todos.map((item, index) => (
              <tr key={`todo-${index}`}>
                <td>{item.description}</td>
                <td>
                  <EditTodo todo={item} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => delTodo(item.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};
