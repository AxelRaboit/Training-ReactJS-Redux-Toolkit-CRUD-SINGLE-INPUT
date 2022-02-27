import "./App.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUsername } from "./features/Users";
import { v4 as uuid } from 'uuid';

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const [username, setUsername] = useState("");
  const [isUpdateName, setIsUpdateName] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleChangeName = (id, user) => {
    setIsUpdateName(true);
    setUserId(id);
    setUsername(user)
  }

  return (
    <div className="App">
      <div className="addUser">
        <input
          type="text"
          value={username}
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button
          onClick={() => {
            if(isUpdateName) {
              setIsUpdateName(false);
              dispatch(
                updateUsername({ id: userId, username: username })
              );
            } else {
              dispatch(
                addUser({
                  id: uuid(),
                  username,
                })
              );
            }
          }}
        >
          {isUpdateName ? 'Update User' : 'Add User'}
        </button>
      </div>
      <div className="displayUsers">
        {userList.map((user) => {
          console.log(user)
          return (
            <div key={user.id}>
              <h1> {user.username}</h1>

              <button onClick={() => (handleChangeName(user.id, user.username), setUsername(user.username))}>Change username</button>

              <button
                onClick={() => {
                  dispatch(deleteUser({ id: user.id }));
                }}
              >
                Delete User
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
