import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import "./userTable.css";
import Pagination from "./Pagination";

export default function TableListPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setcurrentpage] = useState(1);
  const [postsPerpage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

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

  function handleDeleteSelected() {
    setUsers((prevUsers) => {
      prevUsers.filter((user) => !selectedRows.includes(user.id));
    });
    setSelectedRows([]);
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerpage;
  const firstPostIndex = lastPostIndex - postsPerpage;
  const currentUsersData = filteredUsers.slice(firstPostIndex, lastPostIndex);
  console.log("usersData>?", currentUsersData);

 
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, email or role"
        className="searchInput"
        id="searchInput"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <UserTable
        usersData={currentUsersData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <div className="bottom_warpper">
        <button className="delete-selected" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
        <Pagination
          totalPosts={filteredUsers.length}
          postsPerpage={postsPerpage}
          setcurrentpage={setcurrentpage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
