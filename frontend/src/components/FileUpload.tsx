import React, { useState } from 'react';
import axios from 'axios';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".txt" 
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
      />
      <button onClick={handleSubmit}>Process File</button>
      
      {questions.length > 0 && (
        <div>
          <h3>Processed Questions:</h3>
          <pre>{JSON.stringify(questions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}