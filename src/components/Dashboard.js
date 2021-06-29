import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

const useStyles = makeStyles({

    cont: {
        maxWidth: 800,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "100px"
    }
});


export default function Dashboard() {

    const classes = useStyles();

    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([])


    useEffect(() => {

        axios.get('https://mockauth.herokuapp.com/users', {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }).then(response => {
            setRows(response.data);
            setLoading(false)
        })
    }, [])


    if (isLoading) {
        return <div className={classes.cont}>Loading...</div>;
    }


    return (
        <TableContainer className={classes.cont} component={Paper}>
            <Table aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell>Users</TableCell>
                        <TableCell align="right">Login</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Surname</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.login}</TableCell>
                            <TableCell align="right">{row.firstName}</TableCell>
                            <TableCell align="right">{row.lastName}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
