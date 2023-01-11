import { Button } from '@mui/material';

function UploadPage() {
  return (
    <div>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
    </div>
  );
}

export default UploadPage;
