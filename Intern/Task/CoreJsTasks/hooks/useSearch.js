export function useSearch(data) {
  return function (query) {
    return data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };
}
