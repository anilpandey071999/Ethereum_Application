import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';


const NavBar = props => {
    return (
        <Container>
        <div>
            <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        ></link>
        </Head>
            <Header />
            
            {props.children}
            {/* <h1>Im a footer</h1> */}
        </div>
        </Container>
    );
}

export default NavBar