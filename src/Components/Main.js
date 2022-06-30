import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TableContainer, Paper, Typography } from '@mui/material';
import Row from './Row';

export default function Main() {
    const [e_data, setEData] = useState([]);
    const [loader, setLoader] = useState(false);

    const deleteUser = tid => {
        (async function() {
            await axios.delete(`https://reqres.in/api/users/${tid}`);  
        })();
        setEData(e_data.filter((val, id) => val.id !== tid));
        console.log(`delete ${tid} `);
    }

    useEffect(() => {
        (async function () {
            setLoader(true);
            let r_data = await axios.get('https://reqres.in/api/users');      
            // let r_data = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
            setEData(r_data.data.data);
            setLoader(false);
            console.log(r_data.data.data);
        })().then((res) => {
            console.log(res, "response");
        }).catch((error) => {
            console.log(error, "axios error");
        })
    }, []);

    if(loader) {
        return (
            <Typography>Loading...</Typography>
        )
    }else {
        return (
            <Container component="main" maxWidth="sm" >
                <TableContainer component={Paper}>
                    <table className='random-user-table' size="small">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Avatar</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                    {e_data.map((user, id) => {
                        return (
                            <Row key={id} user={user} userDelete={deleteUser} />
                        )
                    })}
                        </tbody>
                    </table>
                </TableContainer>
            </Container>
        )
    }

}
