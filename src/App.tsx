import React, {ChangeEvent, useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

function App() {
  const [title, setTitle] = useState('');
  useEffect(() => {
    axios.get('http://127.0.0.1:4200/users',{
      headers: {
        'x-Requested-Width': 'XMLHttpRequest'
      },
      responseType: 'json'
    }).then(resp => {
      console.log(resp.data);
      setTitle(Array.isArray(resp.data) ? resp.data[0].title : resp.data.title);
    })
    /*const data = {
      title: 'my title',
      body: 'hello man',
      name: 'd'
    };
    axios.post('http://127.0.0.1:4200/users', data, {
      headers: {
        'x-Requested-Width': 'XMLHttpRequest'
      },
      responseType: 'json'
    })
      .then((resp: AxiosResponse) => {
        console.log(resp.data);
        setTitle(Array.isArray(resp.data) ? resp.data[0].title : resp.data.title)
      })*/
  }, [])
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      axios.post('http://127.0.0.1:4200/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(resp => {
        console.log(resp.data);
      })
    }
  }
  return (
    <div>
      <header className="App-header">
        <h3>{title}</h3>
      </header>
      <input type='file' name='file' onChange={handleFileChange}/>
    </div>
  );
}

export default App;
