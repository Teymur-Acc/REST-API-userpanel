import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

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
        width: '100%', // Fix IE 11 issue.
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
    link: {
        paddingRight: '50px'
    },
    heading: {
        color: 'black',
        paddingBottom: '20px'
    }
}));

export default function SignUp() {
    const classes = useStyles();

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState(false);



    useEffect(() => {
        if (login.length > 0 && password.length > 0 && email.length > 0 && firstName.length > 0 && lastName.length > 0) {
            setButton(true)
        } else setButton(false)
    }, [login.length, password.length, email.length, firstName.length, lastName.length])






    function handleSubmit(event) {

        event.preventDefault();

        const user = {
            login: login,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        };


        axios.post(`https://mockauth.herokuapp.com/users`, user)
            .then(res => {
                alert(`Пользователь с именем ${res.data.firstName} зарегестрирован!`); console.log(res.data)
            }).catch(err => alert(`Ошибка! ${err}`))
        document.getElementById("form-reg").reset();
    }



    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.form} noValidate id="form-reg">
                    <Grid container justify="center">
                    <Typography className={classes.heading}>
                        Fill the form and hit "Sign up"
                    </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                name="login"
                                autoComplete="login"
                                onChange={(e) => setLogin(e.target.value)}
                                inputProps={{
                                    maxLength: 16,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                name="password"
                                label="Password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                inputProps={{
                                    maxLength: 16,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={button !== true}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link className={classes.link} href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}