import React from 'react';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import {client} from '../client';

const Login = () => {
    const navigate = useNavigate();

     function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    window.responseGoogle = async (response) => {
        console.log(response);
        
        // handle credition response (JWT response): https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions
        let responsePayload = decodeJwtResponse(response.credential);

        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
        //localStorage.setItem('user', JSON.stringify(response.profileObj));

        // const {name, googleId, imageUrl} = response.profileObj;

        // const doc = {
        //     _id: googleId,
        //     _type: 'user',
        //     userName: name,
        //     image: imageUrl,
        // }

        // client.createIfNotExists(doc)
        //     .then(() => {
        //         navigate('/', {replace: true})
        //     })
    }
    return (
        
        <div className='flex justify-center items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video src={shareVideo} type='vodep/mp4' loop controls={false} muted autoPlay className='w-full h-full object-cover'/> 
                    <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                        <div className='p-5'>
                            <img src={logo} width='130px' alt='logo' />
                        </div>
                        <div className='shadow-2xl'>
                            <div id="g_id_onload"
                                data-client_id= {process.env.REACT_APP_GOOGLE_API_TOKEN}
                                data-context="signin"
                                data-ux_mode="popup"
                                data-callback="responseGoogle"
                                data-auto_prompt="false">
                            </div>

                            <div className="g_id_signin"
                                data-type="standard"
                                data-shape="rectangular"
                                data-theme="outline"
                                data-text="signin_with"
                                data-size="large"
                                data-logo_alignment="left">
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
        
    )
}

export default Login