import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Listing from './pages/listing'
import SharePage from './pages/sharePage'

function App() {
  const itensMock = {
      itens: 
        [{
          title: "Megane 100% elétrico",
          price:"R$ 105.500",
          user: 'Usuário 1',
          id: "01",
          videoLink: "video1.mp4"
        },
        {
          title: "Iphone 12",
          price:"R$ 8.400",
          user: 'Usuário 2',
          id: "ab",
          videoLink: "video2.mp4"
        },
        {
          title: "Mansão em Belo Horizonte",
          price:"R$ 305.500",
          user: 'Usuário 3',
          id: "03",
          videoLink: "video3.mp4"
        },
        {
          title: "pokebola + wii",
          price:"R$ 1.500",
          user: 'Usuário 4',
          id: "04",
          videoLink: "video4.mp4"
        }]
      }
  return(
    <Router>
        <Switch>
            <Route path="/" component={() => Listing(itensMock)}/>
            <Route path="/share" component={SharePage}/>
        </Switch>
    </Router>
);
}

export default App;
