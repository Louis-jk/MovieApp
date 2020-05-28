import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Recommend from './components/Recommend';
import NowPlayingContainer from './container/NowPlayingContainer';
import UpcomingContainer from './container/UpcomingContainer';
import PopularContainer from './container/PopularContainer';
import MovieDetailContainer from './container/MovieDetailContainer';
import LikedContainer from './container/LikedContainer';
import PersonProfile from './components/PersonProfile';
import Search from './components/Search';
import MovieSubDetailsContainer from './container/MovieSubDetailsContainer'

function App() {
  
  return (
      <Switch>        
        <Route path="/" component={PopularContainer} exact />
        <Route path="/upcoming" component={UpcomingContainer} />
        <Route path="/now_playing" component={NowPlayingContainer} />
        <Route path="/recommend" component={Recommend} />
        <Route path="/liked" component={LikedContainer}/>
        <Route path="/search" component={Search} />
        <Route path="/details/:id" component={MovieDetailContainer} />
        <Route path="/sub-details/:id" component={MovieSubDetailsContainer} />
        <Route path="/person/:id" component={PersonProfile} />
        <Route render={({location}) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              <p>{location.pathname}</p>
            </div>
        )}
        />
      </Switch>
  );
}

export default App;
