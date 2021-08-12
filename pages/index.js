import { useState } from 'react'
import { uploadFile } from './api/files'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Header from '../components/Header'
import { createTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';

const theme = createTheme({
  palette: {
    type: "dark",
  }
});

const FILE_NAME = 'file'
const DEFAULT_USERNAME = 'dev'
const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none'
  }
}))

export default function Home() {
    const [file, setFile] = useState("");
    const [invalidInput, setInvalidInput] = useState(false)
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
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className={classes.root}>
      <Header />
      <div className='divisor-top'></div>
      <div className='header-container'>
      <h1> Beautiful Nightmode Friendly Images </h1>
      <h2> For your mobile app or website. </h2>
      </div>
      <div className='divisor-bottom'></div>
      <div className='original-text'>Original Image</div>
      <div>
      <span>
        <div className='original'></div>
        <div className='converted'></div>
      </span>
      </div>
      <form onSubmit={handleSubmit}>
      <div className='divisor-top'></div>
      <div className='header-container'>
      <h1> Upload Your Image </h1>
      <h2> And we'll email you a nightmode friendly version. </h2>
      <label htmlFor="contained-button-file">
        <Button type="submit" variant="contained">
          Upload
        </Button>
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={e => setFile(e.target.files[0])}/>
      <label htmlFor="icon-button-file">
        <IconButton aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      { invalidInput && <div className='input-error'>Please use the camera icon to select a file</div> }
      </div>
      </form>
    </div>
    <div className='divisor-bottom'></div>
    </ThemeProvider>
  );
}
