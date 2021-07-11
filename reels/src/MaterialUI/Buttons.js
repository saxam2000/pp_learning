import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Buttons(props) {
  const classes = useStyles();

  return (
    <div>
      
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
     
      
     
     
        
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<VpnKeyIcon />}
      >
        SignUp
      </Button>
    </div>
  );
}