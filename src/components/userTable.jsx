import { useEffect, useState } from "react";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      {/* Search Input */}
      <input type="text" placeholder="Search by name, email or role" />

      {/* User Table */}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Selected Button */}
      <button className="delete-selected">Delete Selected</button>

      {/* Pagination */}
      <div className="pagination">
        <button className="prev-page">«</button>
        <button className="page active">1</button>
        <button className="page">2</button>
        <button className="page">3</button>
        <button className="page">4</button>
        <button className="page">5</button>
        <button className="next-page">»</button>
      </div>
    </div>
  );
}
