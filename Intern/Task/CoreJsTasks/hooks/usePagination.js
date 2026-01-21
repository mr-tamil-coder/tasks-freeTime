export function usePagination(itemsPerPage) {
  let currentPage = 1;
  let totalData = [];

  return {
    setData(data) { 
      totalData = data;
      currentPage = 1;
    },

    getCurrentPageData() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return totalData.slice(startIndex, endIndex);
    },

    getTotalPages() {
      return Math.ceil(totalData.length / itemsPerPage);
    },

    getCurrentPage() {
      return currentPage;
    },

    goToPage(pageNum) {
      const totalPages = this.getTotalPages();
      if (pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum;
        return true;
      }
      return false;
    },

    nextPage() {
      return this.goToPage(currentPage + 1);
    },

    prevPage() {
      return this.goToPage(currentPage - 1);
    },

    getInfo() {
      const totalPages = this.getTotalPages();
      const totalItems = totalData.length;
      const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, totalItems);
      
      return {
        currentPage,
        totalPages,
        totalItems,
        startItem,
        endItem
      };
    }
  };
}
