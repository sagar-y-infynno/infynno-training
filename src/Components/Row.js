import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Row(props) {
    // const deleteUser = id => {
    //     // (async function() {
    //     //     // await axios.delete(`https://reqres.in/api/users/${id}`);  
    //     // })();
    //     console.log(`delete ${id} `);
    // }
    return (
        <tr>
            <td>
                <p>{ props.user.id }</p>
            </td>
            <td>
                <img className='avatar-img' src={ props.user.avatar } alt="avatar image" />
            </td>
            <td>
                <p>{ props.user.email }</p>
            </td>
            <td>
                <p>{ props.user.first_name }</p>
            </td>
            <td>
                <p>{ props.user.last_name }</p>
            </td>
            <td>
                <Link to={"/view/"+props.user.id}>
                    <button variant="outlined" onClick={ () => { console.log(props.user.id) } } >View</button>
                </Link>
                <button variant="outlined" onClick={ () => { props.userDelete(props.user.id) } } >Delete</button>
            </td>
        </tr>
    )
}
