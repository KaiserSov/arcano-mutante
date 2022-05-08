import React, {useEffect, useState} from 'react';
import UserTable from './components/userTable';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import { v4 as uuidv4 } from 'uuid';

function App() {
  //Generates a random id

  function informationLocal(){
    const usersData = localStorage.getItem("form");

    if (!usersData)
    return [
      { id: uuidv4(), name: 'Perencejita', username: 'Gala' },
      { id: uuidv4(), name: 'Sutanito', username: 'Viktor' },
      { id: uuidv4(), name: 'Peranito', username: 'Geralt' },
    ];

    return JSON.parse(usersData);
  }


  //state
  const [users, setUsers] = useState(informationLocal)
  

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(users));
  }, [users]);
  
  //Add users
  const addUser = (user) => {
    user.id = uuidv4()
    setUsers([
      ...users,
      user
    ])
  }

  //Delete users
  const deleteUser = (id) => {
    //console.log(id)

    const arrayFiltrado = users.filter(user => user.id !== id);

    setUsers(arrayFiltrado);
  }

  //Edit users
  const [editing, setEditing] = useState(false);

  const [currentUser, setCurrentUser] = useState ({
    id: null,
    name: "",
    username: "",
  });

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  };

  //Update the user when you edit it
  const updateUser = (id, updateUser) => {
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updateUser : user)));
  };

  return (
    <div className='container'>
     <h1>CRUD App with hooks</h1>
     <div className='flex-row'>
       <div className='flex-large'>

         {
           editing ? (
             <div>
              <h2>Edit user</h2>
              <EditUserForm 
              currentUser={currentUser}
              updateUser={updateUser}
              />
            </div>
           ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
           )
         }
       </div>
       <div className='flex-large'>
         <h2>View users</h2>
         <UserTable 
         users={users} 
         deleteUser={deleteUser} 
         editRow={editRow}
         />
       </div>
     </div>
    </div>
  );
}

export default App;