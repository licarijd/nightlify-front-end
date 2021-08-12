import React from 'react';
import NextLink from 'next/link'
import { Link as MUILink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Icon, SvgIcon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="dark" position="static">
        <Toolbar>
          <div className='logo'/>
          <Typography variant="h6" className={classes.title}>
            Nightlify
          </Typography>
          {/*<NextLink href='/login'>
            <Button  color="inherit">Login</Button>
          </NextLink>
          <NextLink href='/register'>
            <Button  color="inherit">Register</Button>
          </NextLink>*/}
        </Toolbar>
      </AppBar>
    </div>
  );
}