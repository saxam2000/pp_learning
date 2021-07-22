import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TextFields(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
   
     <div>
        <TextField
          id="outlined-multiline-flexible"
          label={props.Label}
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          variant="outlined"
          height= "5vh"
        />

       
      </div>
    
  );
}
