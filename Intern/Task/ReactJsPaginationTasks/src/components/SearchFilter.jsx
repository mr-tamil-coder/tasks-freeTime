const SearchFilter = ({ 
  nameSearch, 
  ageSearch, 
  locationSearch, 
  onNameChange, 
  onAgeChange, 
  onLocationChange,
  locations 
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        className="search-input"
        value={nameSearch}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <input
        type="text"
        className="search-input"
        placeholder="Age (e.g., 25 or 23-30)"
        value={ageSearch}
        onChange={(e) => onAgeChange(e.target.value)}
      />
      <select
        value={locationSearch}
        onChange={(e) => onLocationChange(e.target.value)}
        className="search-input"
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
