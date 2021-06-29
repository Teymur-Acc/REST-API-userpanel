import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";


function Copyright() {
    return (
        <Typography variant="body2" color="white" align="center">
            {'Copyright © '}
            <Link href="https://freeua.agency/">
                Freeua
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
        backgroundColor: 'white',
        padding: theme.spacing(5),
        borderRadius: '5%',
        height: "500px",
        paddingTop: "50px"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    heading: {
        color: 'black',
        paddingBottom: '20px'
    }
}));

export default function Password() {
    const classes = useStyles();


    const [email, setEmail] = useState('')
    const [button, setButton] = useState(false);

    useEffect(() => {
        if (email.length > 0) {
            setButton(true)
        } else setButton(false)
    }, [email.length])




    function handleSubmit(e) {
        e.preventDefault();

        axios.put(`https://mockauth.herokuapp.com/auth/reset-password`,  {
            email: email
            }).then(response => console.log(response))
        document.getElementById("form-pass").reset()
    }




    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.form} noValidate id="form-pass">
                    <Grid container justify="center">
                        <Typography className={classes.heading}>
                            Please, enter your Email
                        </Typography>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={button !== true}
                    >
                        Send new password
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}