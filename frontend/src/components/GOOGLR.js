import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const CLIENT_ID = '14301864581-j3130h0hrfc40vvkeghci0cd2n5d6krh.apps.googleusercontent.com';

const GOOGLR = () => {
    const onSuccess = async (response) => {
        console.log('Login Success:', response);
        const { credential, profile } = response;
        const { email, name } = profile;

        console.log('User Email:', email);
        console.log('User Name:', name);

        try {
            const res = await axios.post('/create-event', { token: credential });
            console.log('Event Created:', res.data);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const onFailure = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onFailure}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GOOGLR;
