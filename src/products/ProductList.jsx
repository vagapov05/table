import React, { useState, useEffect } from 'react';

import { 
   Paper, 
   Table, 
   TableBody, 
   TableCell, 
   TableContainer, 
   TableHead, 
   TablePagination, 
   TableRow, 
   Typography, 
   Divider, 
   Button, 
   Box, 
   Stack, 
   TextField, 
   Autocomplete, 
   Modal 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { collection, getDocs, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../firebase-config';

import Swal from 'sweetalert2';

import AddForm from './AddForm';
import EditForm from './EditForm';

import { useAppStore } from '../appStore';


const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

export default function ProductList() {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const setRows = useAppStore((state) => state.setRows);
   const rows = useAppStore((state) => state.rows);
   const [formid, setFormid] = useState('');
   const [open, setOpen] = useState(false);
   const [editOpen, setEditOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleEditOpen = () => setEditOpen(true);
   const handleClose = () => setOpen(false);
   const handleEditClose = () => setEditOpen(false);
   const empCollectionRef = collection(db, 'products');

   useEffect(() => {
      getUsers();
   }, [])

   const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   }

   const deleteUser = (id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.value) {
            deleteApi(id);
         }
      });
   }

   const deleteApi = async (id) => {
      const userDoc = doc(db, "products", id);
      await deleteDoc(userDoc);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      getUsers();
   }

   const filterData = (v) => {
      if (v) {
         setRows([v]);
      } else {
         setRows([]);
         getUsers();
      }
   }

   const editData = (id, name, price, category) => {
      const data = {
         id: id,
         name: name,
         price: price,
         category: category,
      }
      setFormid(data);
      handleEditOpen();
   }


   return (
      <>
         <div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
               <Box sx={style}>
                  <AddForm closeEvent={handleClose} />
               </Box>
            </Modal>

            <Modal open={editOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
               <Box sx={style}>
                  <EditForm closeEvent={handleEditClose} fid={formid} />
               </Box>
            </Modal>
         </div>

         {rows.length > 0 && (
            <Paper sx={{ width: "100%" }}>
               <Box height={15} />

               <Stack direction="row" spacing={2} className="my-2 mb-2">
                  <Autocomplete
                     disablePortal
                     id="combo-box-demo"
                     options={rows}
                     sx={{ width: 300 }}
                     onChange={(e, v) => filterData(v)}
                     getOptionLabel={(rows) => rows.name || ""}
                     renderInput={(params) => (
                        <TextField {...params} size="small" label="Search Products" />
                     )}
                  />

                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

                  <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen}>Add</Button>
               </Stack>

               <Box height={15} />

               <Divider />
               
               <TableContainer sx={{ maxHeight: 440 }}>
                  <Table aria-label="sticky table">
                     <TableHead>
                        <TableRow>
                           <TableCell align="left" style={{ minWidth: "100px" }}>Name</TableCell>
                           <TableCell align="right" style={{ minWidth: "100px" }}>Price</TableCell>
                           <TableCell align="right" style={{ minWidth: "100px" }}>Category</TableCell>
                           <TableCell align="right" style={{ minWidth: "100px" }}>Date</TableCell>
                           <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
                        </TableRow>
                     </TableHead>

                     <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1}>
                                 <TableCell key={row.id} align="left">{row.name}</TableCell>
                                 <TableCell key={row.id} align="right">{row.price}</TableCell>
                                 <TableCell key={row.id} align="right">{row.category}</TableCell>
                                 <TableCell key={row.id} align="right">{row.date}</TableCell>
                                 <TableCell key={row.id} align="right">
                                    <Stack spacing={2} direction="row">
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

               <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
            </Paper>
         )}
      </>
   );
}
