import React, { useEffect } from 'react';
import './contact.css';

const Contact = () => {

    useEffect(() => {
        const script = document.createElement('script');

        script.src = ("https://platform.linkedin.com/badges/js/profile.js");
        script.async = true;

        document.body.appendChild(script);

    }, []);

    return(    
        <div
            className='Contact'
        >
        <p className='ContactText'>
                This is a burger builder website built by me using React. I have used libraries like react-redux, react-router, react-redux-sagas, react-hooks etc. In addition, I have used Firebase to setup user authentication and store the details of burger and delivery. I have used CSS to style the components. This website is also a Progressive Web App, and can be added as an app on phone.
                <br/> <br />
                Please feel free to work around the website. Your comments and feedback are welcomed. My LinkedIn profile is displayed below.
        </p>

            <br/>
            <br />
            <br />
            <div className = 'Linkedin'>
            <div className="LI-profile-badge" data-version="v1" data-size="large" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="mirmuizqaisar"><a className="LI-simple-link" href='https://au.linkedin.com/in/mirmuizqaisar?trk=profile-badge'>Muiz Qaisar Mir</a></div>
            </div>
        </div>
        )
}

export default Contact;
