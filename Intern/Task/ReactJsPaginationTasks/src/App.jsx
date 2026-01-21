import { useState, useEffect } from 'react'
import DisplayData from './components/DisplayData'
import SearchFilter from './components/SearchFilter'

const PER_PAGE_SIZE = 10;

function App() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentpage] = useState(0);
  const [nameSearch, setNameSearch] = useState('');
  const [ageSearch, setAgeSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch("/utils/userData.json")
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const uniqueLocations = [...new Set(users.map(user => user.location))].sort();

  const checkAgeMatch = (userAge, ageSearch) => {
    if (!ageSearch) return true;
    if (ageSearch.includes('-')) {
      const [min, max] = ageSearch.split('-').map(num => parseInt(num.trim()));
      if (!isNaN(min) && !isNaN(max)) {
        return userAge >= min && userAge <= max;
      }
    }
    return userAge.toString().includes(ageSearch);
  };

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(nameSearch.toLowerCase());
    const ageMatch = checkAgeMatch(user.age, ageSearch);
    const locationMatch = locationSearch === '' || user.location === locationSearch;
    return nameMatch && ageMatch && locationMatch;
  });

  useEffect(() => {
    setCurrentpage(0);
  }, [nameSearch, ageSearch, locationSearch]);

  const totalPages = Math.ceil(filteredUsers.length / PER_PAGE_SIZE);
  const start = currentPage * PER_PAGE_SIZE;
  const end = start + PER_PAGE_SIZE;
  const currentUsers = filteredUsers.slice(start, end);

  console.log("START", start, "END", end, "CURRENT PAGE", currentPage) 

  const handlePageChange = (page) => {
    setCurrentpage(page);
  };

  return !users.length ? (
    <h1>No data found</h1>
  ) : (
    <>
      <SearchFilter 
        nameSearch={nameSearch}
        ageSearch={ageSearch}
        locationSearch={locationSearch}
        onNameChange={setNameSearch}
        onAgeChange={setAgeSearch}
        onLocationChange={setLocationSearch}
        locations={uniqueLocations}
      />
      
      {filteredUsers.length === 0 ? (
        <div>
          <h2>No matching results found</h2>
        </div>
      ) : (
        <>
          <DisplayData 
            users={currentUsers} 
            totalPages={totalPages} 
            currentPage={currentPage} 
            handlePageChange={handlePageChange}
          />
          <p>{`Current page : ${currentPage + 1} of ${totalPages} at ${start} to ${end}`}</p>
        </>
      )}
      
      
    </>
  )
}

export default App
