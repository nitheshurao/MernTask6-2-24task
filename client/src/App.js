import './App.css';
import { Alert, Box, Button, Card, CardContent, CardHeader, Grid, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import axios from 'axios';

function App() {
  const [postData, setPostData] = useState({ title: '', selectedFile: '' });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(['']);
  const [errorAlert, seterrorAlert] = useState(false)
  const [savedData, setSavedData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000').then((res) => {
      setData(res?.data?.data)
    })
  }, [])
  const handleUpload = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('logFile', postData);
      const response = await axios.post('http://localhost:5000/creator', postData);
      setSavedData(response.data)
    } catch (error) {
      // Handle error, show alert
      seterrorAlert(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={errorAlert}
          autoHideDuration={6000}
          onClose={() => { seterrorAlert(false) }}
        >
          <Alert severity="success">File upd.</Alert>

        </Snackbar>
        <Box sx={{ padding: '30px' }}>
          <Button variant="contained" onClick={handleUpload}
            disabled={!postData?.selectedFile}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
          <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

        </Box>

        <Grid container spacing={2} >
          <Grid item xs={4}>
            <Card sx={{ margin: '10px' }} >
              <CardHeader
                title=
                {savedData?.createdAt
                }
                subheader={savedData?._id}
              />
              <CardContent>
                <Typography paragraph sx={{ maxWidth: '80px' }}>
                  {savedData?.selectedFile}
                </Typography>
              </CardContent>
            </Card >
          </Grid>

          <Grid item xs={8}>
            {data?.length > 0 && data?.map((item) => {
              return (
                <>
                  <Card sx={{ margin: '10px' }} >
                    <CardHeader
                      title=
                      {item?.createdAt
                      } />
                    <CardContent>
                      <Typography paragraph sx={{ maxWidth: '80px' }}>
                        {item?.selectedFile}
                      </Typography>
                    </CardContent>
                  </Card >
                </>

              )

            })}
          </Grid>
        </Grid>
      </header>


    </div >
  );
}

export default App;
