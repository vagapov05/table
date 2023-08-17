import React, { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase-config';


const ContainerTable = ({ rows, setRows, page, rowsPerPage, editData, deleteUser, checkedRows, setCheckedRows, selectAll, setSelectAll }) => {
   const [sortBy, setSortBy] = useState('price');
   const [sortDirection, setSortDirection] = useState('asc');

   const empCollectionRef = collection(db, 'products');

   useEffect(() => {
      getProducts();
   }, []);

   const getProducts = async () => {
      const q = query(empCollectionRef, orderBy(sortBy, sortDirection));
      const data = await getDocs(q);
      setRows(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
   };

   const handleChangeSortDirectionByName = () => {
      if (sortDirection === 'asc') {
         setSortDirection('desc');
      } else {
         setSortDirection('asc');
      }

      setSortBy('name');
      getProducts();
   };

   const handleChangeSortDirectionByPrice = () => {
      if (sortDirection === 'asc') {
         setSortDirection('desc');
      } else {
         setSortDirection('asc');
      }

      setSortBy('price');
      getProducts();
   };

   const handleChangeSortDirectionByCategory = () => {
      if (sortDirection === 'asc') {
         setSortDirection('desc');
      } else {
         setSortDirection('asc');
      }

      setSortBy('category');
      getProducts();
   };

   const handleChangeSortDirectionByDate = () => {
      if (sortDirection === 'asc') {
         setSortDirection('desc');
      } else {
         setSortDirection('asc');
      }

      setSortBy('date');
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
