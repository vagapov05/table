import React from 'react';

import { Autocomplete, TextField } from '@mui/material';


const Search = ({ rows, filterData }) => {
   return (
      <>
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
      </>
   )
}

export default Search;
