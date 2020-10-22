import React from 'react';
import {Upload} from "./components/FileUpload/upload";

function App() {
  const handleSuccess = (data) => {
    console.log('success: ' + JSON.stringify(data));
  }
  const handleError = (err) => {
    console.error(err);
  }
  const handleProgress = (percentage) => {
    console.log("percentage: " + percentage);
  }
  return (
    <Upload action="http://127.0.0.1:4200/users/upload"
     onSuccess={handleSuccess} onError={handleError}
     onProgress={handleProgress}
    />
  )
}

export default App;
