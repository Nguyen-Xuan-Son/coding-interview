import { Button } from '@mui/material';
import { sha256 } from 'crypto-hash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { checkDocument, uploadDocument } from '../service/upload-file';

function UploadPage() {
  const [output, setOutput] = useState('');
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (output) {
      (async () => {
        const { payload } = await dispatch(
          checkDocument({ hash: output }) as any
        );

        if (payload.hash === '' && payload.authorId === 0) {
          const { payload } = await dispatch(
            uploadDocument({ hash: output }) as any
          );
          console.log('payload add', payload);
        } else {
          console.log('payload get', payload);
        }

        setOutput('');
      })();
    }
  }, [output, dispatch]);

  return (
    <div>
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
    </div>
  );
}

export default UploadPage;
