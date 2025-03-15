import PropTypes from "prop-types";
export default function UserTable({
  usersData,
  selectedRows,
  setSelectedRows,
  handleRowDelete,
}) {
  function handleRowSelect(userId) {
    setSelectedRows((previousSelectedRows) =>
      previousSelectedRows.includes(userId)
        ? previousSelectedRows.filter((id) => userId != id)
        : [...previousSelectedRows, userId]
    );
  }

  function handleAllRowSelect() {
    if (usersData.length === selectedRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(usersData.map((user) => user.id));
    }
  }

  console.log("selectedRows..", selectedRows);
  return (
    <>
      <div className="user_table_container">
        <table className="user_table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleAllRowSelect}
                  checked={
                    selectedRows.length === usersData.length &&
                    usersData.length > 0
                  }
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr
                key={user.id}
                className={selectedRows.includes(user.id) ? "selected" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => handleRowSelect(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn" onClick={() => handleRowDelete(user.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

UserTable.propTypes = {
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
  handleRowDelete: PropTypes.func.isRequired,
};
