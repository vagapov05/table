import React from 'react';

import { TablePagination } from '@mui/material';


const Pagination = ({ rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
   return (
      <>
         <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
      </>
   )
}

export default Pagination;
