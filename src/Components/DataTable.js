import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { Container, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

export default function DataTable() {

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
            <Container sx={{marginBlock: "40px"}} component="main" maxWidth="lg">
                <p>Loading...</p>
            </Container>
        )
    }else {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={e_data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        );
        // return (
        //     <Container sx={{marginBlock: "40px"}} component="main" maxWidth="lg">
        //         <TableContainer component={Paper}>
        //         <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //             <TableHead>
        //             <TableRow>
        //                 <TableCell>ID</TableCell>
        //                 <TableCell align="center">Avatar</TableCell>
        //                 <TableCell align="center">Email</TableCell>
        //                 <TableCell align="center">First Name</TableCell>
        //                 <TableCell align="center">Last Name</TableCell>
        //                 <TableCell align="center">Actions</TableCell>
        //             </TableRow>
        //             </TableHead>
        //             <TableBody>
        //             {e_data.map((row, id) => (
        //                 <TableRow
        //                 key={row.id}
        //                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                 >
        //                     <TableCell align="right">{row.id}</TableCell>
        //                     <TableCell align="right"><img style={{borderRadius: '50%', height: "10vw", width: "10vw"}} src={row.avatar} /></TableCell>
        //                     <TableCell align="right">{row.email}</TableCell>
        //                     <TableCell align="right">{row.first_name}</TableCell>
        //                     <TableCell align="right">{row.last_name}</TableCell>
        //                     <TableCell align="center">
        //                         <Link to={"/view/"+row.id} >
        //                             <Button>View</Button>
        //                         </Link>
        //                         <Button onClick={ () => { deleteUser(row.id) } } >Delete</Button>
        //                     </TableCell>
        //                 </TableRow>
        //             ))}
        //             </TableBody>
        //         </Table>
        //         </TableContainer>
        //     </Container>
        // );
    
    }
}
