import {
  Button,
  Snackbar,
  Toolbar,
  Box,
  Typography,
  AppBar,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'crypto-hash';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

import { checkDocument, uploadDocument } from '../service/upload-file';
import { logout } from '../store/account';

function UploadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [output, setOutput] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fr = new FileReader();
    const fileList = e.target.files;

    if (!fileList) return;

    fr.onload = async () => {
      if (!fr.result) return;
      const result = await sha256(fr.result);
      setOutput(result);
    };
    fr.readAsText(fileList[0]);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    if (output) {
      (async () => {
        const { payload } = await dispatch(
          checkDocument({ hash: output }) as any
        );

        if (payload.hash === '' && payload.authorId === 0) {
          await dispatch(uploadDocument({ hash: output }) as any);
          setOpen(true);
          setMessage('Add success!');
        } else {
          setOpen(true);
          setMessage('Document have owner before! ID: ' + payload.authorId);
        }

        setOutput('');
      })();
    }
  }, [output, dispatch]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="div"
        sx={{
          p: 2,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            multiple={false}
            hidden
            onChange={handleFileInput}
            onClick={(e: any) => {
              e.target.value = null;
            }}
          />
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      />
    </div>
  );
}

export default UploadPage;
