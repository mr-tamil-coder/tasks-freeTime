import "./displayData.css"
const DisplayData = ({ users, totalPages, currentPage, handlePageChange }) => {
  return (
    <div >
      <div >
        <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div >
        <div >
            <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="nav-btn"
        >
          Previous
        </button>
          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              onClick={() => handlePageChange(n)}
              className={currentPage === n ? "active nav-btn" : "nav-btn"}
            >
              {n + 1}
            </button>
          ))}

          <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="nav-btn"
        >
          Next
        </button>
        </div>

        
      </div>
    </div>
  );
};

export default DisplayData;