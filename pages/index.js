import { useState } from 'react';
import { uploadFile } from './api/files'

export default function Home() {
    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault()

      const data = new FormData()
      data.append('file', file, file.name)
      
      try {
        await uploadFile(data)
      } catch(err) {
        console.log(err)
      }
    } 

    return (
    <form onSubmit={handleSubmit}>
      <input name="imageFile" type="file" onChange={e => setFile(e.target.files[0])}/>
      <input type="submit" value="Upload Image" name="submit"></input>
    </form>
  )
}
