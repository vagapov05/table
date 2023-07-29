import React, { useState } from 'react';

import { useFormik } from 'formik';

import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, IconButton, Typography, TextField, MenuItem, InputAdornment } from '@mui/material';

import { addDoc } from 'firebase/firestore';

import Swal from 'sweetalert2';


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
];

const AddForm = ({ closeEvent, empCollectionRef, getUsers }) => {
   const [loading, setLoading] = useState(false);

   const handleNameChange = (event) => {
      formik.setFieldValue('name', event.target.value);
   };

   const handlePriceChange = (event) => {
      formik.setFieldValue('price', event.target.value);
   };

   const handleCategoryChange = (event) => {
      formik.setFieldValue('category', event.target.value);
   };

   const formik = useFormik({
      initialValues: {
         name: '',
         price: 0,
         category: '',
      },
      onSubmit: async (values) => {
         setLoading(true);
         await addDoc(empCollectionRef, {
            name: values.name,
            price: Number(values.price),
            category: values.category,
            date: String(new Date()),
         })
         setLoading(false);
         getUsers();
         closeEvent();
         Swal.fire('Submitted!', 'Your file has been submitted.', 'success');
      },
      validate: (values) => {
         const errors = {};
         if (!values.name) {
            errors.name = 'Name is required';
         }
         if (!values.price) {
            errors.price = 'Price is required';
         }
         if (!values.category) {
            errors.category = 'Category is required';
         }
         return errors;
      },
   });

   
   return (
      <>
         <Typography variant="h5" align='center'>Add product</Typography>
         <IconButton style={{position: 'absolute', top: '0', right: '0'}} onClick={closeEvent}>
            <CloseIcon />
         </IconButton>
         <Box height={20} />

         <Grid container spacing={2}>
            <Grid item xs={12}>
               <TextField 
                  value={formik.values.name} 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  size='small' 
                  sx={{minWidth: '100%'}} 
                  onChange={handleNameChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
               />
            </Grid>

            <Grid item xs={6}>
               <TextField 
                  value={formik.values.price} 
                  type='number' 
                  id="outlined-basic" 
                  label="Price" 
                  variant="outlined" 
                  size='small' 
                  sx={{minWidth: '100%'}} 
                  onChange={handlePriceChange} 
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
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
                  value={formik.values.category} 
                  select 
                  id="outlined-basic" 
                  label="Category" 
                  variant="outlined" 
                  size='small' 
                  sx={{minWidth: '100%'}} 
                  onChange={handleCategoryChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
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
                  <LoadingButton 
                     loading={loading} 
                     disabled={loading} 
                     variant="contained" 
                     onClick={formik.handleSubmit}
                  >
                     Submit
                  </LoadingButton>
               </Typography>
            </Grid>
         </Grid>
      </>
   )
}

export default AddForm;
