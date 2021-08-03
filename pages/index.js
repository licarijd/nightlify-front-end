import { useState } from 'react'
import { uploadFile } from './api/files'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { FormControl } from '@material-ui/core';

const FILE_NAME = 'file'
const DEFAULT_USERNAME = 'dev'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none'
  },
}))

export default function Home() {
    const [file, setFile] = useState("");
    console.log(file)

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log("SUB")
      console.log(file)
      
      const data = new FormData()
      data.append(FILE_NAME, file, `${DEFAULT_USERNAME}-${new Date().getTime()}-${file.name}`)
      
      try {
        await uploadFile(data)
      } catch(err) {
        console.log(err)
      }
    } 
    const classes = useStyles()
    console.log(classes)

  /*return (
    <FormControl onSubmit={handleSubmit}>
      <Input name="imageFile" type="file" onChange={e => setFile(e.target.files[0])}/>
      <Button type="submit" value="Upload Image" name="submit">Upload Image</Button>
    </FormControl>
  )*/
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
      {/*<input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />*/}
      <label htmlFor="contained-button-file">
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={e => setFile(e.target.files[0])}/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      </form>
    </div>
  );
}
