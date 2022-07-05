import React, { useEffect, useState } from 'react';
import {
    Container, 
    Box, 
    CircularProgress, 
    CardContent, 
    CardMedia, 
    Typography,
    Button
} from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function View() {
    const [e_data, setEData] = useState([]);
    const [loader, setLoader] = useState(false);
    const { id } = useParams();

    let udata = localStorage.getItem('usersData')?.split(',  ').map((u)=> JSON.parse(u));    
    let tdata = udata.filter((ud) => {
        
        console.log(ud.id, id, "test")

        return ud.id == id;

    });

    
    useEffect(() => {
        (async function () {
            setLoader(true);
            
            let r_data = await axios.get(`https://reqres.in/api/users/${id}`);      
            setEData(r_data.data.data);

            setLoader(false);
        })();
    }, []);    

    if(loader) {
        return(
            <Container sx={{marginBlock: "40px", height: '100vh', display: 'flex', justifyContent: "center", alignItems: "center"}} component="main" maxWidth="lg">
                <CircularProgress />
            </Container>    
        );
    }else {
        return (
            <Container
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                component="main" maxWidth="sm" >
                <Box sx={{ display: 'flex', width: 'max-width', margin: '50px auto' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={tdata[0].avatar}
                        alt="user"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width: "30vw" }}>
                        <CardContent sx={{ flex: '1 0 auto', justifyContent: 'end', p: '0', textAlign: "right"  }}>
                            <Typography component="div" color="white" variant="h5">
                                {tdata[0].first_name} {tdata[0].last_name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                            {tdata[0].email}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', columnGap: '20px' }}>
                            <Link to={`/edit/${tdata[0].id}`} >
                                <Button variant="contained" sx={{ width: 'max-content' }} color="info" > Edit </Button>
                            </Link>
                            <Link to="/">
                                <Button variant="outlined" > Back </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        );
    }

}
