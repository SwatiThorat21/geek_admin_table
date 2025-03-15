import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import "./userTable.css";
import Pagination from "./Pagination";
import searchIcon from "../assets/search-icon.png";

export default function TableListPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
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
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
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
    console.log("users:", users);
    setSelectedRows([]);
  }

  function handleRowDelete(userId) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }

  function handleSearch() {
    setsearchQuery(searchTerm); 
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }


  const lastPostIndex = currentPage * postsPerpage;
  const firstPostIndex = lastPostIndex - postsPerpage;
  const currentUsersData = filteredUsers.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
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
        <img src={searchIcon} alt="search-icon" className="search-icon" onClick={handleSearch} />
      </div>

      <UserTable
        usersData={currentUsersData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleRowDelete={handleRowDelete}
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
