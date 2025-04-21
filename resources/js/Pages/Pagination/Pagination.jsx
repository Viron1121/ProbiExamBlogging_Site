import React, { useState } from 'react';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore, MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";

function Pagination({ table }) {
  const [currentPage, setCurrentPage] = useState(table.getState().pagination.pageIndex);

  const totalPages = table.getPageCount();

  const getVisiblePages = (current, total) => {
    const visiblePages = 5;
    let start = Math.max(0, current - Math.floor(visiblePages / 2));
    let end = start + visiblePages;
    
    if (end > total) {
      end = total;
      start = Math.max(0, end - visiblePages);
    }

    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  }; 

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (pageIndex) => {
    table.setPageIndex(pageIndex);
    setCurrentPage(pageIndex);
  };

  return (
    <div className='d-flex justify-content-between'>
      <div className='align-items-center d-flex gap-3 justify-content-center'>
        <span>
          <select
            className='form-select form-select-sm form-select-solid'
            value={table.getState().pagination.pageSize}
            onChange={e => {
              const selectedPageSize = Number(e.target.value);
              table.setPageSize(selectedPageSize);
            }}
          >
            {[5, 10, 25, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>
        <span>
          Showing {table.getState().pagination.pageIndex + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getCoreRowModel().rows.length)} of {table.getCoreRowModel().rows.length} entries
        </span>
      </div>

      <div className='d-flex'>
        <button
          className='btn btn-sm d-flex align-items-center justify-content-center'
          onClick={() => handlePageChange(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <MdOutlineSkipPrevious className='fs-3'/>
        </button>
        <button
          className='btn btn-sm d-flex align-items-center justify-content-center'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          <MdOutlineNavigateBefore className='fs-3'/>
        </button>

        {/* Page Numbers */}
        {visiblePages.map((pageNumber) => (
          <button
            style={{}}
            key={pageNumber}
            className={`btn btn-sm d-flex align-items-center justify-content-center ${currentPage === pageNumber - 1 ? 'btn-secondary' : ''}`}
            onClick={() => handlePageChange(pageNumber - 1)}
          >
            {pageNumber}
          </button>
        ))}
        {/* Page Numbers */}

        <button
          className='btn btn-sm d-flex align-items-center justify-content-center'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!table.getCanNextPage()}
        >
          <MdOutlineNavigateNext className='fs-3'/>
        </button>
        <button
          className='btn btn-sm d-flex align-items-center justify-content-center'
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={!table.getCanNextPage()}
        >
          <MdOutlineSkipNext className='fs-3'/>
        </button>
      </div>
    </div>
  );
}

export default Pagination;