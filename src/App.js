/**
 * En el siguiente proyecto, podrá visualizar un crud de usuarios, el cual maneja un LocalStorage.
 * @author Sara Oquendo Valle
 * El crud aquí realizado fue hecho con la ayuda de un video guía, el cual usó la página de otra autora como referencia.
 * Video: https://www.youtube.com/watch?v=8rLs-AGn4go
 * Página: https://www.taniarascia.com/crud-app-in-react-with-hooks/
 */

import React, { useEffect, useState } from "react";
import UserTable from "./components/userTable";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import { v4 as uuidv4 } from "uuid";

/**
 * Función principal que llama todos los componentes, maneja LocalStorage y da id de forma aleatoria
 * @returns retorna datos al localStorage, retorna componentes
 */
function App() {
  /**
   * Función que maneja los id y el almacenamiento de datos
   * @returns retorna identificadores
   */
  function informationLocal() {
    const usersData = localStorage.getItem("form");

    if (!usersData)
      return [
        { id: uuidv4(), name: "Perencejita", username: "Gala" },
        { id: uuidv4(), name: "Sutanito", username: "Viktor" },
        { id: uuidv4(), name: "Peranito", username: "Geralt" },
      ];

    return JSON.parse(usersData);
  }

  //state
  const [users, setUsers] = useState(informationLocal);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(users));
  }, [users]);

  /**
   * Añade usuarios
   * @param {*} user, es el usuario digitado en el form
   */
  const addUser = (user) => {
    user.id = uuidv4();
    setUsers([...users, user]);
  };

  /**
   * Elimina usuarios
   * @param {*} id, identificador de usuarios
   */
  const deleteUser = (id) => {
    const arrayFiltrado = users.filter((user) => user.id !== id);

    setUsers(arrayFiltrado);
  };

  /**
   * Edita los usuarios, name y username
   */
  const [editing, setEditing] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    username: "",
  });

  /**
   * Edita el contenido en forms
   * @param {*} user, es el usuario digitado en el form
   */
  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  };

  /**
   * Actualiza los datos del usuario seleccionado
   * @param {*} id, identificador del usuario
   * @param {*} updateUser, es usado para actualizar mediante map
   */
  const updateUser = (id, updateUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updateUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD App with hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm currentUser={currentUser} updateUser={updateUser} />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
