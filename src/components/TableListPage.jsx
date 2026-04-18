import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import "./userTable.css";
import Pagination from "./Pagination";
import searchIcon from "../assets/search-icon.png";

export default function TableListPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleDeleteSelected() {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedRows.includes(user.id))
    );
    setSelectedRows([]);
  }

  function handleRowDelete(userId) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }

  function handleRowEdit(userId) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...editValues } : user
      )
    );
    setEditableRow(null);
  }

  function startEditing(userId, user) {
    setEditValues({ name: user.name, email: user.email, role: user.role });
    setEditableRow(userId);
  }

  function handleSearch() {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentUsersData = filteredUsers.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <h2>Geek Admin Table</h2>
      <div className="searchbarWrapper">
        <input
          type="text"
          placeholder="Search by name, email or role"
          className="searchInput"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={searchIcon}
          alt="search-icon"
          className="search-icon"
          onClick={handleSearch}
        />
      </div>

      <UserTable
        usersData={currentUsersData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleRowDelete={handleRowDelete}
        handleRowEdit={handleRowEdit}
        editableRow={editableRow}
        editValues={editValues}
        setEditValues={setEditValues}
        startEditing={startEditing}
      />
      <div className="bottom_warpper">
        <button className="delete-selected" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
        <Pagination
          totalPosts={filteredUsers.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}