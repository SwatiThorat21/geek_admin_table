import { useEffect, useMemo, useState } from "react";
import UserTable from "./UserTable";
import "./userTable.css";
import Pagination from "./Pagination";
import searchIcon from "../assets/search-icon.png";

export default function TableListPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    if (!normalizedSearchTerm) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedSearchTerm) ||
        user.email.toLowerCase().includes(normalizedSearchTerm) ||
        user.role.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [users, normalizedSearchTerm]);

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

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function clearSearch() {
    setSearchTerm("");
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
          onChange={handleSearchChange}
        />
        <img src={searchIcon} alt="search-icon" className="search-icon" />
        {searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={clearSearch}
            aria-label="Clear search"
            title="Clear search"
          >
            Clear
          </button>
        )}
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
