import React, { Component } from 'react';
import './App.css';

import { data } from './data';

import Header from './header/header';
import MovieList from './movie-list/movie-list';

class App extends Component {
  state = {
    movieData: data,
    headerMessage: 'Movie App'
  };

  render() {
    return (
      <div>
        <Header headerMessage={this.state.headerMessage} />
        <MovieList movieData={this.state.movieData} />
      </div>
    );
  }
}

export default App;
