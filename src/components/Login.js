import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {withRouter} from "react-router-dom";


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
    heading: {
        color: 'black',
        paddingBottom: '20px'
    },
    forgot: {
        paddingRight: "10px"
    }
}));

 function Login(props) {
    const classes = useStyles();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState(false);

    useEffect(() => {
        if (login.length > 0 && password.length > 0) {
            setButton(true)
        } else setButton(false)
    }, [login.length, password.length])


    function handleSubmit(event) {

        event.preventDefault();


        axios.get(`https://mockauth.herokuapp.com/auth/login`, {
            params: {
                login: login,
                password: password
            }
        }).then(resp => {
            alert(`Login with token : ${resp.data.token.substr(1, 30)}`); localStorage.setItem("token", resp.data.token ); window.location.reload(true)

        }).catch(err => alert(`Ошибка! ${err}`));

        props.history.push('/dashboard');

        document.getElementById("form-log").reset();
    }





    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.form} noValidate id="form-log">
                    <Grid container justify="center">
                        <Typography className={classes.heading}>
                            Please, enter your credentials
                        </Typography>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={button !== true}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xl className={classes.forgot}>
                            <Link href="/password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/registration" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default withRouter(Login)