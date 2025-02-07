export interface Paginated<T> {


    //data flied contains the paginated items
    data: T[];
    //metadata about pagination
    
    meta: {
      itemsPerPage: number;
      currentPage: number;
      totalItems: number;
      totalPages: number;
    };
  }