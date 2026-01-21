import { useSearch } from "../hooks/useSearch.js";
import { useFilter } from "../hooks/useFilter.js";
import { usePagination } from "../hooks/usePagination.js";
import users from "../model/data.js"; 

const search = useSearch(users);
const filter = useFilter(users);
const pagination = usePagination(10);

const input = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const ageFilter = document.getElementById("ageFilter");
const result = document.getElementById("result");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const itemsInfo = document.getElementById("itemsInfo");

function renderUsers(users) {
  result.innerHTML = "";
  users.forEach(user => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.textContent = user.name;
    
    const ageTd = document.createElement("td");
    ageTd.textContent = user.age;
    
    const locationTd = document.createElement("td");
    locationTd.textContent = user.location;
    
    tr.appendChild(nameTd);
    tr.appendChild(ageTd);
    tr.appendChild(locationTd);
    
    result.appendChild(tr);
  });
}

function updatePaginationControls() {
  const info = pagination.getInfo();
  
  pageInfo.textContent = `Page ${info.currentPage} of ${info.totalPages}`;
  itemsInfo.textContent = `Showing ${info.startItem}-${info.endItem} of ${info.totalItems} users`;
  
  prevBtn.disabled = info.currentPage === 1;
  nextBtn.disabled = info.currentPage === info.totalPages || info.totalPages === 0;
}

function applyFiltersAndSearch() {
  const location = locationFilter.value;
  const ageRange = ageFilter.value;
  
  let ageMin, ageMax;
  if (ageRange !== "All") {
    const [min, max] = ageRange.split("-").map(Number);
    ageMin = min;
    ageMax = max;
  }
  
  let filteredData = filter({ location, ageMin, ageMax });
  
  const searchQuery = input.value;
  if (searchQuery) {
    filteredData = filteredData.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  pagination.setData(filteredData);
  const paginatedData = pagination.getCurrentPageData();
  
  renderUsers(paginatedData);
  updatePaginationControls();
}

pagination.setData(users);
const initialData = pagination.getCurrentPageData();
renderUsers(initialData);
updatePaginationControls();

input.addEventListener("input", applyFiltersAndSearch);
locationFilter.addEventListener("change", applyFiltersAndSearch);
ageFilter.addEventListener("change", applyFiltersAndSearch);

prevBtn.addEventListener("click", () => {
  if (pagination.prevPage()) {
    const paginatedData = pagination.getCurrentPageData();
    renderUsers(paginatedData);
    updatePaginationControls();
  }
});

nextBtn.addEventListener("click", () => {
  if (pagination.nextPage()) {
    const paginatedData = pagination.getCurrentPageData();
    renderUsers(paginatedData);
    updatePaginationControls();
  }
});

