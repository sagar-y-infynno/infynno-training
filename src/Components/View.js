import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { 
    Container, 
    Box, 
    CircularProgress, 
    Button, 
    Divider
} from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function View() {
    const [e_data, setEData] = useState([]);
    const [loader, setLoader] = useState(false);
    const { id } = useParams();

    
    useEffect(() => {

        console.log(id, "id");
        (async function () {
            setLoader(true);
            
            // ==== new api
            // let { data } = await axios.get(`https://random-data-api.com/api/users/random_user?id=${id}`);      
            // setEData(data);

            // ==== old api
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
                        image={e_data.avatar}
                        alt="user"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width: "30vw" }}>
                        <CardContent sx={{ flex: '1 0 auto', justifyContent: 'end', p: '0', textAlign: "right"  }}>
                            <Typography component="div" color="white" variant="h5">
                                {e_data.first_name} {e_data.last_name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                            {e_data.email}
                            </Typography>
                        </CardContent>
                        <Link to={`/edit/${e_data.id}`} >
                            <Button variant="contained" sx={{ width: 'max-content' }} color="info" > Edit </Button>
                        </Link>
                    </Box>
                    {/* <Divider /> */}
                    {/* <Box sx={{ display: 'flex', alignItems: 'end', pl: 1, pb: 1 }}>
                        <Button variant="contained" color="info" > Edit </Button>
                    </Box> */}
                </Box>
                <Link to="/">
                    <Button variant="outlined" > Back </Button>
                </Link>
            </Container>
        );
    }

}
