import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Header } from '../components'

export default function Share(){
    const history = useHistory();

    return(
        <Container>
            <Header />
            Share Page
        </Container>
    );
}