import React, { useState, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, Typography, Button, Box, Modal } from '@mui/material';
import { Stack } from '@mui/system';

import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase-config';

import Swal from 'sweetalert2';

import { useAppStore } from '../appStore';

import AddForm from './AddForm';
import EditForm from './EditForm';
import Search from './Search';
import ContainerTable from './ContainerTable';
import Pagination from './Pagination';


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

const ProductList = () => {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [formid, setFormid] = useState('');
   const [checkedRows, setCheckedRows] = useState([]);
   const [selectAll, setSelectAll] = useState(true);
   const [sortBy, setSortBy] = useState('price');
   const [sortDirection, setSortDirection] = useState('asc');

   const rows = useAppStore((state) => state.rows);
   const setRows = useAppStore((state) => state.setRows);
   
   const [addOpen, setAddOpen] = useState(false);
   const [editOpen, setEditOpen] = useState(false);

   const handleAddOpen = () => setAddOpen(true);
   const handleEditOpen = () => setEditOpen(true);
   
   const handleAddClose = () => setAddOpen(false);
   const handleEditClose = () => setEditOpen(false);

   const empCollectionRef = collection(db, 'products');

   useEffect(() => {
      getUsers();
      getProducts();
   }, []);

   const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
   }

   const getProducts = async () => {
      const q = query(empCollectionRef, orderBy(sortBy, sortDirection));
      const data = await getDocs(q);
      setRows(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
   };

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
      })
   }

   const deleteApi = async (id) => {
      const userDoc = doc(db, "products", id);
      await deleteDoc(userDoc);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      getUsers();
   }

   const deleteCheckedRows = async () => {
      const ids = checkedRows;
      const deletedRows = await Promise.all(
         ids.map((id) => {
            const userDoc = doc(db, "products", id);
            return deleteDoc(userDoc);
         })
      )
    
      if (deletedRows.length > 0) { 
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete them!",
         }).then((result) => {
            if (result.value) {
               setCheckedRows([]);
               getUsers();
            }
         })
      }
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
            <Modal open={addOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
               <Box sx={style}>
                  <AddForm closeEvent={handleAddClose} empCollectionRef={empCollectionRef} getUsers={getUsers} />
               </Box>
            </Modal>

            <Modal open={editOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
               <Box sx={style}>
                  <EditForm closeEvent={handleEditClose} fid={formid} getUsers={getUsers} />
               </Box>
            </Modal>
         </div>

         {rows.length > 0 && (
            <Paper sx={{ width: "100%", overflow: 'hidden' }}>
               <Box height={15} />
               
               {!checkedRows.length > 0 ? (
                  <Stack direction="row" spacing={2} className="my-2 mb-2">
                     <Search rows={rows} filterData={filterData} />
                     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

                     <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddOpen}>
                        Add
                     </Button>
                  </Stack>
               ) : (
                  <Stack direction="row" spacing={2} className="my-2 mb-2">
                     <Typography variant="h5" gutterBottom>{checkedRows.length} selected</Typography>
                     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

                     <Button variant="contained" endIcon={<DeleteIcon />} onClick={deleteCheckedRows}>
                        Delete
                     </Button>
                  </Stack>
               )}
               
               <ContainerTable 
                  rows={rows}  
                  page={page} 
                  rowsPerPage={rowsPerPage} 
                  editData={editData} 
                  deleteUser={deleteUser} 
                  checkedRows={checkedRows} 
                  setCheckedRows={setCheckedRows} 
                  selectAll={selectAll} 
                  setSelectAll={setSelectAll} 
                  getProducts={getProducts} 
                  sortBy={sortBy} 
                  setSortBy={setSortBy} 
                  sortDirection={sortDirection} 
                  setSortDirection={setSortDirection} 
               />

               <Pagination 
                  rows={rows} 
                  page={page} 
                  rowsPerPage={rowsPerPage} 
                  handleChangePage={handleChangePage} 
                  handleChangeRowsPerPage={handleChangeRowsPerPage} 
               />
            </Paper>
         )}
      </>
   );
}

export default ProductList;
