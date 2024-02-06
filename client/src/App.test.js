import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import { Button, Card, Grid } from '@mui/material';
import AlertDialog from './components/AlertDialog';
import BasicAlerts from './components/AlertDialog';

const App = () => {

  const [postData, setPostData] = useState({ title: '', selectedFile: '' });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:5000').then((res) => {
      console.log("res", res);
    })
  }, [])
  const handleUpload = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('logFile', postData);
      console.log("form---", postData);
      const response = await axios.post('http://localhost:5000/creator', postData);

      // Handle successful response
      console.log(response.data);
    } catch (error) {
      // Handle error, show alert
      console.error("_____", error);
      // alert('Error occurred during file upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* <AlertDialog /> */}
          <Card >
            <Button variant="contained" onClick={handleUpload}
            // disabled={postData?.selectedFile || loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
            <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

          </Card>
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>

      <BasicAlerts />
    </>
  );
};

export default App;