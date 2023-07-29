import React, { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';


const ContainerTable = ({ rows, page, rowsPerPage, editData, deleteUser, checkedRows, setCheckedRows, selectAll, setSelectAll }) => {
   const [sortBy, setSortBy] = useState('price');
   const [sortDirection, setSortDirection] = useState('asc');
  
   const handleChangeSortDirection = () => {
      if (sortDirection === 'asc') {
         setSortDirection('desc');
      } else {
         setSortDirection('asc');
      }

      setSortBy('price');
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
                           indeterminate={checkedRows.length === 0} 
                           checked={selectAll} 
                           onChange={() => {
                              setSelectAll(!selectAll);
                              if (selectAll) {
                                 setCheckedRows(rows.map((row) => row.id));
                              } else {
                                 setCheckedRows([]);
                              }
                           }} 
                        />
                     </TableCell>
                     <TableCell align="left" style={{ minWidth: "100px" }}>Name</TableCell>
                     <TableCell align="right" style={{ minWidth: "100px" }}>
                        <TableSortLabel 
                           active={sortBy === 'price'} 
                           direction={sortDirection} 
                           onClick={handleChangeSortDirection} 
                        />
                        Price
                     </TableCell>
                     <TableCell align="right" style={{ minWidth: "100px" }}>Category</TableCell>
                     <TableCell align="right" style={{ minWidth: "100px" }}>Date</TableCell>
                     <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {rows.sort((a, b) => {
                     if (sortBy === 'price') {
                        if (sortDirection === 'desc') {
                           return a.price - b.price;
                        } else {
                           return b.price - a.price;
                        }
                     }
                  }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                     return (
                        <TableRow key={index}>
                           <TableCell align="left">
                              <Checkbox 
                                 color="primary" 
                                 size="small" 
                                 checked={checkedRows.includes(row.id)} 
                                 onChange={() => {
                                    if (checkedRows.includes(row.id)) {
                                       setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((id) => id !== row.id));
                                    } else {
                                       setCheckedRows((prevCheckedRows) => [...prevCheckedRows, row.id]);
                                    }
                                 }} 
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
