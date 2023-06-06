import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Grid, IconButton, Typography, TextField, Button, MenuItem, InputAdornment } from '@mui/material';

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

import Swal from 'sweetalert2';

import { useAppStore } from '../appStore';


const currencies = [
   {
     value: 'Mobile',
     label: 'Mobile',
   },
   {
     value: 'Laptop',
     label: 'Laptop',
   },
   {
     value: 'Electronics',
     label: 'Electronics',
   },
   {
     value: 'Food',
     label: 'Food',
   },
];

const AddForm = ({closeEvent}) => {
   const [name, setName] = useState('');
   const [price, setPrice] = useState(0);
   const [category, setCategory] = useState('');
   const setRows = useAppStore((state) => state.setRows);
   const empCollectionRef = collection(db, 'products');

   const handleNameChange = (event) => {
      setName(event.target.value);
   };

   const handlePriceChange = (event) => {
      setPrice(event.target.value);
   };

   const handleCategoryChange = (event) => {
      setCategory(event.target.value);
   };

   const createUser = async() => {
      await addDoc(empCollectionRef, {
         name: name,
         price: Number(price),
         category: category,
         date: String(new Date()),
      })
      getUsers();
      closeEvent();
      Swal.fire('Submitted!', 'Your file has been submitted.', 'success');
   }

   const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
   }

   
   return (
      <>
         <Box sx={{m: 2}} />

         <Typography variant="h5" align='center'>Add product</Typography>
         
         <IconButton style={{position: 'absolute', top: '0', right: '0'}} onClick={closeEvent}>
            <CloseIcon />
         </IconButton>

         <Box height={20} />

         <Grid container spacing={2}>
            <Grid item xs={12}>
               <TextField 
                  value={name} 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  size='small' 
                  sx={{minWidth: '100%'}} 
                  onChange={handleNameChange}
               />
            </Grid>

            <Grid item xs={6}>
               <TextField 
                  value={price}  
                  id="outlined-basic" 
                  label="Price" 
                  variant="outlined" 
                  size='small' 
                  sx={{minWidth: '100%'}} 
                  onChange={handlePriceChange} 
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <AttachMoneyIcon />
                        </InputAdornment>
                     )
                  }}
               />
            </Grid>

            <Grid item xs={6}>
               <TextField 
                  value={category} 
                  select 
                  id="outlined-basic" 
                  label="Category" 
                  variant="outlined" 
                  size='small' 
                  sx={{minWidth: '100%'}} 
                  onChange={handleCategoryChange}
               >
                  {currencies.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </TextField>
            </Grid>

            <Grid item xs={12}>
               <Typography variant="h5" align='center'>
                  <Button variant="contained" onClick={createUser}>Submit</Button>
               </Typography>
            </Grid>
         </Grid>

         <Box sx={{m: 4}} />
      </>
   )
}

export default AddForm;
