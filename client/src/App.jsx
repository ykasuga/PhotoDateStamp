import React, { useState } from 'react';
import axios from 'axios';
import FileDropZone from './FileDropZone';

function App() {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    // event.target.filesがFileListまたは配列の場合に対応
    const files = event.target.files;
    setSelectedFiles(Array.isArray(files) ? files : Array.from(files));
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert('Please select files to upload.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:5002/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important for receiving a ZIP file
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'processed_images.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please check the console.');
    }
  };

  return (
    <>
      <h1>PhotoDateStamp</h1>
      {/* <input type="file" multiple onChange={handleFileChange} /> */}
      <FileDropZone onFileDrop={handleFileChange} />
      {selectedFiles && selectedFiles.length > 0 && (
        <ul>
          {selectedFiles.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}
      <button onClick={handleUpload}>Upload and Process</button>
    </>
  );
}

export default App;
