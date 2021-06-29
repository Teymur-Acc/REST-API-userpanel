import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";



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
        height: "350px",
        paddingTop: "40px"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    heading: {
        color: 'black',
        paddingBottom: '15px'
    },
    forgot: {
        paddingRight: "10px"
    }
}));

export default function ResetPassword() {

    const classes = useStyles();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`https://mockauth.herokuapp.com/auth/reset-password/${window.location.search.substr(6)}`,{
            password: password,
            confirmPassword: confirmPassword
    }).then(response => {console.log(response); alert(`Пароль успешно изменён!`)})}

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.form} noValidate id="form-log">
                    <Grid container justify="center">
                        <Typography className={classes.heading}>
                            Enter your new password
                        </Typography>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="newpassword"
                        label="Password"
                        name="newpassword"
                        autoComplete="newpassword"
                        autoFocus
                        onChange={(event) => setPassword(event.target.value)}
                        inputProps={{
                            maxLength: 16,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newpassword"
                        label="Confirm password"
                        type="password"
                        id="newpassword"
                        autoComplete="newpassword"
                        onChange={(event) => setConfirmPassword(event.target.value)}
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
                    >
                        Change password
                    </Button>
                </form>
            </div>
        </Container>
    );
}