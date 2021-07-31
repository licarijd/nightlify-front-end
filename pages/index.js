import { useState } from 'react';
import { uploadFile } from './api/files'

const FILE_NAME = 'file'
const DEFAULT_USERNAME = 'dev'

export default function Home() {
    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault()
      
      const data = new FormData()
      data.append(FILE_NAME, file, `${DEFAULT_USERNAME}-${new Date().getTime()}-${file.name}`)
      
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
