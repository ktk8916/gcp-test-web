import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { api } from "./apiClient";

function App() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [users, setUsers] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const userSave = async (e) => {
    e.preventDefault();
    await api(`/api`, "POST", form);
    getUser();
  };

  const getUser = async () => {
    const data = await api(`/api`, "GET", {});
    setUsers(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
        }}
      >
        <h1>USER</h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChangeHandler}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit" onClick={userSave}>
            제출
          </button>
        </form>
        <table border="1px solid black">
          <tbody>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
            </tr>
          </tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.description}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default App;
