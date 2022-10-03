import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import XLSX from 'xlsx';
import sheetInspector from './sheet';

// const formatOptions = ['Fødselsdato (ddmmyyyy)', 'ddmmyy'];

const Fileupload = () => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const upload: Array<unknown> = [];

    Array.from(e?.target?.files).forEach((f) => {
      if (f === undefined && upload === undefined) return;
      upload.push(f);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sheets = upload.map(async (u: File | any) => {
      return Promise.resolve(
        await u?.arrayBuffer().then((b: Array<unknown>) => {
          return XLSX.read(b);
        })
      );
    });

    // eslint-disable-next-line promise/catch-or-return, @typescript-eslint/no-explicit-any
    const json = Promise.all(sheets).then((s: Array<any>) => {
      return Array.from(s).map((el) => {
        return XLSX.utils.sheet_to_json(el?.Sheets?.Ark1);
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // (await json).forEach((x: Array<any>) => console.log(x, sheetInspector(x)));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (await json).forEach((x: Array<any>) => console.log(sheetInspector(x)));
  };

  return (
    <Button
      sx={{ width: '100%', height: '50px', marginTop: 5 }}
      variant="contained"
      component="label"
      startIcon={<UploadFileIcon />}
    >
      Last opp regneark
      <input
        hidden
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        multiple
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          handleUpload(e);
        }}
      />
    </Button>
  );
};

export default Fileupload;
