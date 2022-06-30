import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CircularProgress, Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


export default function Form() {
    const [user, setUser] = React.useState({
        email: '',
        avatar: '',
        last_name: '',
        first_name: ''
    });
    const [loader, setLoader] = React.useState(false);
    
    const { id } = useParams();
    
    React.useEffect(() => {
        // console.log(id);
        (async function () {
            
            // ==== new api
            // let { data } = await axios.get(`https://random-data-api.com/api/users/random_user?id=${id}`);      
            // setEData(data);

            // ==== old api
            let { data } = await axios.get(`https://reqres.in/api/users/${id}`);
            setUser(data.data);
            // console.log(user);
        })();
    }, []);

    const updateUser = async () => {
        setLoader(true);
        return await axios.put(`https://reqres.in/api/users/${id}`, user);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        updateUser().then((res) => {
            setLoader(false);
            if(res.status === 200) {
                console.log("updated successfully")
            }else {
                console.log("not updated")
            }
        });

        console.log(user);
    };

    const handleFields = (k, e) => {
        setUser({...user, [k]: e.target.value});
    }

    return (
        <Container maxWidth="sm" >
        {/* <Grid container component="main" sx={{ height: '100vh' }}> */}
            {/* <CssBaseline /> */}
            {/* <Grid item xs={12} sm={12} md={12} component={Paper} elevation={8} square> */}
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#fff'
                }}
            >
                {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar> */}
                <Typography component="h1" variant="h5">
                    Update Details
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                
                {/* <img src={user.avatar} alt="afadf" />
                
                <Button
                    variant="contained"
                    component="label"
                    >
                    Upload File
                    <input
                        type="file"
                        onChange={e => handleFields('avatar', e)}
                        hidden
                    />
                </Button> */}
                
                <TextField
                    InputProps={{ sx: { color: '#fff' } }}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleFields('email', e)}
                    autoComplete="email"
                    autoFocus
                />

                <TextField
                    InputProps={{ sx: { color: '#fff' } }}
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => handleFields('first_name', e)}
                    autoComplete="first_name"
                />
                <TextField
                    InputProps={{ sx: { color: '#fff' } }}
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    value={user.last_name}
                    onChange={(e) => handleFields('last_name', e)}
                    autoComplete="last_name"
                />

                <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "max-content" }}
                >
                { loader ? <CircularProgress color='error' /> : "Update" }
                </Button>
                <Link to="/">
                    <Button
                        type="submit"
                        fullWidth
                        size="large"    
                        variant="outlined"
                        color="info"
                        sx={{ mt: 3, ml: 2, mb: 2, width: "max-content" }}
                    >
                        Back
                    </Button>
                </Link>
                </Box>
            </Box>
            {/* </Grid> */}
        {/* </Grid> */}
        </Container>
    );
}