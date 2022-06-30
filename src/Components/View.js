import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { 
    Container, 
    Box, 
    CircularProgress, 
    Button 
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
            <Container sx={{ display: 'flex', width: 'max-width', margin: '50px auto' }} 
                component="main" maxWidth="sm" >
                {/* <Card sx={{ maxWidth: 345, margin: '50px auto' }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="200"
                        image={e_data.avatar}
                        alt="random-image"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {e_data.first_name} {e_data.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {e_data.email}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card> */}
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={e_data.avatar}
                    alt="user"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" color="text.primary" variant="h5">
                            {e_data.first_name} {e_data.last_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                        {e_data.email}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Button variant="outlined" > Delete </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

}
