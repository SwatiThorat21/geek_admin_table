import PropTypes from "prop-types";

export default function UserTable({
  usersData,
  selectedRows,
  setSelectedRows,
  handleRowDelete,
  handleRowEdit,
  editableRow,
  editValues,
  setEditValues,
  startEditing,
}) {
  function handleRowSelect(userId) {
    setSelectedRows((previousSelectedRows) =>
      previousSelectedRows.includes(userId)
        ? previousSelectedRows.filter((id) => userId !== id)
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

  return (
    <div className="user_table_container">
      <table className="user_table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleAllRowSelect}
                checked={
                  selectedRows.length === usersData.length && usersData.length > 0
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
              className={[
                selectedRows.includes(user.id) ? "selected" : "",
                editableRow === user.id ? "editing-row" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelect(user.id)}
                />
              </td>
              <td>
                <div className="cell-content">
                  {editableRow === user.id ? (
                    <input
                      type="text"
                      className="input"
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues({ ...editValues, name: e.target.value })
                      }
                    />
                  ) : (
                    <span className="fade-out">{user.name}</span>
                  )}
                </div>
              </td>
              <td>
                <div className="cell-content">
                  {editableRow === user.id ? (
                    <input
                      type="text"
                      className="input"
                      value={editValues.email}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span className="fade-out">{user.email}</span>
                  )}
                </div>
              </td>
              <td>
                <div className="cell-content">
                  {editableRow === user.id ? (
                    <input
                      type="text"
                      className="input"
                      value={editValues.role}
                      onChange={(e) =>
                        setEditValues({ ...editValues, role: e.target.value })
                      }
                    />
                  ) : (
                    <span className="fade-out">{user.role}</span>
                  )}
                </div>
              </td>
              <td className="actions-cell">
                <div className="action-buttons">
                {editableRow === user.id ? (
                  <button
                    className="save-btn fade-in action-btn action-btn-primary"
                    onClick={() => handleRowEdit(user.id)}
                    aria-label={`Save changes for ${user.name}`}
                    title="Save"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-btn fade-in action-btn action-btn-secondary"
                    onClick={() => startEditing(user.id, user)}
                    aria-label={`Edit ${user.name}`}
                    title="Edit"
                  >
                    Edit
                  </button>
                )}
                <button
                  className="delete-btn action-btn action-btn-danger"
                  onClick={() => handleRowDelete(user.id)}
                  aria-label={`Delete ${user.name}`}
                  title="Delete"
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  handleRowEdit: PropTypes.func.isRequired,
  editableRow: PropTypes.string,
  editValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setEditValues: PropTypes.func.isRequired,
  startEditing: PropTypes.func.isRequired,
};
