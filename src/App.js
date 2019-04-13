import React, { Component } from 'react';
import './App.css';
import { data } from './data';
import Header from './header/header';
import MovieList from './movie-list/movie-list';
import { Switch, Route, withRouter } from 'react-router-dom'
import MovieSpecific from './movie-specific/movie-specific'

class App extends Component {
  state = {
    movieData: data,
    headerMessage: 'Movie App'
  };

  render() {
    const renderWithHistory = (movieData) => {
      const filtering = movieData.filter(movie => {
        return movie.movieName === this.props.history.location.pathname.split('/')[1];
      });
      if (filtering[0] !== undefined) {
        return filtering[0]
      }
    }

    return (
      <div>
        <Header headerMessage={this.state.headerMessage} />
        <Switch>
          <Route path="/:what" render={() => <MovieSpecific movieData={renderWithHistory(this.state.movieData)} />} />
          <Route path="/" render={() => <MovieList history={this.props.history} movieData={this.state.movieData} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
