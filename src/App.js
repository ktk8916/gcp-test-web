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
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={onChangeHandler}
        />
        <label htmlFor="desc">description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={form.description}
          onChange={onChangeHandler}
        />
        <button type="submit" onClick={userSave}>
          제출
        </button>
      </form>
      <div style={{ display: "flex" }}>
        <h1>id</h1>
        <h2>name</h2>
        <h3>description</h3>
      </div>
      {users.map((user, i) => (
        <div key={i} style={{ display: "flex" }}>
          <h1>{user.id}</h1>
          <h2>{user.name}</h2>
          <h3>{user.description}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
