import React, { useState, useEffect } from 'react';
import { Container, VideoPlayer } from '../components'

export default function Listing({ itens }){

    return(
        <Container>
            {itens.map(item => 
                <VideoPlayer item={item}/>
            )}
        </Container>
    );
}