import { useState } from 'react'
import { uploadFile } from './api/files'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Header from '../components/Header'
import { createTheme } from '@material-ui/core/styles'
import { CssBaseline, TextField } from '@material-ui/core';
import validator from 'email-validator'

const theme = createTheme({
  palette: {
    type: "dark",
  }
})
const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none'
  },
  cssLabel: {
    '&$cssFocused': {
      color : 'white'
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
      color: 'white'
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: 'white !important'
  }
}))

export default function Home() {
  const [file, setFile] = useState('');
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validator.validate(email)) {
      setMessage('Please enter a valid email address')
      return
    }

    if (!file) {
      setMessage('Please select an image to upload')
      return
    }

    setMessage('')
    
    const data = new FormData()
    data.append('file', file, `${new Date().getTime()}-${file.name}`)
    data.set('data', email)

    try {
      const res = await uploadFile(data)
      
      if (res.status == 200)
        setMessage(`Thanks, an email will be sent to ${email} when your nightmode friendly images are ready!`)
    } catch(err) {
      console.log(err)
    }
  } 
  const classes = useStyles()

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
        <div className='divisor-bottom'/>
        <div className='original-text'>Original Image</div>
        <div>
          <span>
            <div className='original'/>
            <div className='converted'/>
          </span>
        </div>
          <form onSubmit={handleSubmit}>
          <div className='divisor-top'/>
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
            <span className='email-input'>
            <TextField
              id="standard-name"
              label="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                },
                inputMode: "numeric"
              }}
            />
            </span>
            <div className='input-message'>{message}</div>
          </div>
        </form>
      </div>
      <div className='divisor-bottom'/>
    </ThemeProvider>
  );
}
