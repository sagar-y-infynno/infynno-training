import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TTable() {

    const [e_data, setEData] = useState([]);
    const [loader, setLoader] = useState(false);

    const deleteUser = tid => {
        (async function() {
            //==== old api
            await axios.delete(`https://reqres.in/api/users/${tid}`);  
        })();
        setEData(e_data.filter((val, id) => val.id !== tid));
        console.log(`delete ${tid} `);
    }

    useEffect(() => {
        if(e_data.length === 0) {
            (async function () {
                setLoader(true);
                // ==== new api
                // let { data } = await axios.get('https://random-data-api.com/api/users/random_user?size=5');
                // setEData(data);
                
                // ==== old api
                let r_data = await axios.get('https://reqres.in/api/users');      
                // let r_data = await axios.get('https://dummy.restapiexample.com/api/v1/employees');

                setEData(r_data.data.data);
                
                setLoader(false);
            })();
        }
    }, [e_data]);

    if(loader) {
        return (
            <Container sx={{marginBlock: "40px", height: '100vh', display: 'flex', justifyContent: "center", alignItems: "center"}} component="main" maxWidth="lg">
                <CircularProgress />
            </Container>
        )
    }
    return (
        <Container sx={{marginBlock: "40px"}} component="main" maxWidth="lg">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Avatar</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {e_data.map((row, id) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center"><img alt="avatar" style={{ boxShadow: '0px 0px 1px 3px #fff, 0px 0px 1px 5px #147', borderRadius: '50%', height: "7vw", width: "7vw"}} src={row.avatar} /></TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.first_name}</TableCell>
                            <TableCell align="center">{row.last_name}</TableCell>
                            <TableCell align="center">
                                <Link to={"/view/"+row.id} >
                                    <Button variant="outlined" >View</Button>
                                </Link>
                                <Button sx={{marginLeft: "10px"}} variant="outlined" onClick={ () => { deleteUser(row.id) } } >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
