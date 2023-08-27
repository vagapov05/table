import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';


const ContainerTable = ({ rows, page, rowsPerPage, editData, deleteUser, checkedRows, setCheckedRows, selectAll, setSelectAll, getProducts, sortBy, setSortBy, sortDirection, setSortDirection }) => {
   const handleChangeSortDirectionByName = () => {
      setSortBy('name');
      setSortDirection((sortDirection === 'asc') ? 'desc' : 'asc');
      getProducts();
   };

   const handleChangeSortDirectionByPrice = () => {
      setSortBy('price');
      setSortDirection((sortDirection === 'asc') ? 'desc' : 'asc');
      getProducts();
   };

   const handleChangeSortDirectionByCategory = () => {
      setSortBy('category');
      setSortDirection((sortDirection === 'asc') ? 'desc' : 'asc');
      getProducts();
   };

   const handleChangeSortDirectionByDate = () => {
      setSortBy('date');
      setSortDirection((sortDirection === 'asc') ? 'desc' : 'asc');
      getProducts();
   };

   const handleSelectAll = () => {
      setSelectAll(!selectAll);
      if (selectAll) {
         setCheckedRows(rows.map((row) => row.id));
      } else {
         setCheckedRows([]);
      }
   };

   const handleCheckboxChange = (rowId) => {
      if (checkedRows.includes(rowId)) {
         setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((id) => id !== rowId));
      } else {
         setCheckedRows((prevCheckedRows) => [...prevCheckedRows, rowId]);
      }
   };


   return (
      <>
         <TableContainer>
            <Table aria-label="sticky table">
               <TableHead>
                  <TableRow>
                     <TableCell align="left">
                        <Checkbox 
                           color="primary" 
                           size="small" 
                           indeterminate={checkedRows.length > 0 && checkedRows.length < rows.length} 
                           checked={rows.length > 0 && checkedRows.length === rows.length} 
                           onChange={handleSelectAll} 
                        />
                     </TableCell>
                     <TableCell align="left" style={{ minWidth: "100px" }}>
                        <TableSortLabel 
                           active={sortBy === 'name'} 
                           direction={sortDirection} 
                           onClick={handleChangeSortDirectionByName} 
                        >
                           Name
                        </TableSortLabel>
                     </TableCell>
                     <TableCell align="right" style={{ minWidth: "100px" }}>
                        <TableSortLabel 
                           active={sortBy === 'price'} 
                           direction={sortDirection} 
                           onClick={handleChangeSortDirectionByPrice} 
                        >
                           Price
                        </TableSortLabel>
                     </TableCell>
                     <TableCell align="right" style={{ minWidth: "100px" }}>
                        <TableSortLabel 
                           active={sortBy === 'category'} 
                           direction={sortDirection} 
                           onClick={handleChangeSortDirectionByCategory} 
                        >
                           Category
                        </TableSortLabel>
                     </TableCell>
                     <TableCell align="right" style={{ minWidth: "100px" }}>
                        <TableSortLabel 
                           active={sortBy === 'date'} 
                           direction={sortDirection} 
                           onClick={handleChangeSortDirectionByDate} 
                        >
                           Date
                        </TableSortLabel>
                     </TableCell>
                     <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                     return (
                        <TableRow key={index}>
                           <TableCell align="left">
                              <Checkbox 
                                 color="primary" 
                                 size="small" 
                                 checked={checkedRows.includes(row.id)} 
                                 onChange={() => handleCheckboxChange(row.id)} 
                              />
                           </TableCell>
                           <TableCell align="left">{row.name}</TableCell>
                           <TableCell align="right">{row.price}</TableCell>
                           <TableCell align="right">{row.category}</TableCell>
                           <TableCell align="right">{row.date}</TableCell>
                           <TableCell align="right">
                              <Stack spacing={1} direction="row">
                                 <EditIcon
                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                    className="cursor-pointer"
                                    onClick={() => {
                                       editData(row.id, row.name, row.price, row.category);
                                    }}
                                 />

                                 <DeleteIcon
                                    style={{ fontSize: "20px", cursor: "pointer" }}
                                    onClick={() => {
                                       deleteUser(row.id);
                                    }}
                                 />
                              </Stack>
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   )
}

export default ContainerTable;
