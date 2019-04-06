import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import { confetti } from 'dom-confetti';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-image: ${props =>
    props.backgroundImage
      ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${props.backgroundImage})`
      : ''};
  background-position: 50% 50%;
  background-size: cover;
  padding: 2rem;
  transition: 0.25s;
  &:hover {
    padding-top: 10rem;
    padding-bottom: 10rem;
    > div.sub-introduce {
      display: flex;
      flex-direction: column;
    }
    > div.like-button {
      display: flex;
      justify-content: center;
    }
  }

  > span.title {
    font-size: 3.5rem;
    color: #61dafb;
    margin-bottom: 2rem;
    cursor: pointer;
  }
  > div.genre {
    display: flex;
    margin-bottom: 1rem;

    > span {
      margin-right: 1rem;
      font-size: 1rem;
      color: #f5f5f5;
    }
  }
  > span.sub {
    font-size: 2rem;
    color: #f5f5f5;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  > div.sub-introduce {
    display: none;
    padding-top: 2rem;
    transition: 0.25s;

    > span {
      color: white;
      line-height: 1.5;
      font-size: 1.5rem;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
    }
  }
  > div.like-button {
    display: none;
    padding-top: 4rem;

    > span {
      width: 100px;
      height: 100px;
      cursor: pointer;
      background-image: ${props =>
        props.likeImage
          ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${props.likeImage})`
          : ''};
      background-position: 50% 50%;
      background-size: cover;
    }
  }
`;

class MovieList extends React.Component {
  domConfettiRefs = this.props.movieData.map(() => React.createRef());

  showParadise = idx => {
    confetti(this.domConfettiRefs[idx].current);
  };

  render() {
    const convertEnterToLine = someString => {
      const strings = someString.split('\n');
      return strings.map((values, idx) => {
        return <span key={idx}>{values}</span>;
      });
    };

    const showGenre = genres => {
      return genres.map((genre, idx) => {
        return <span key={idx}>{genre}</span>;
      });
    };

    const renderMovieList = lists => {
      return lists.map((unit, idx) => {
        return (
          <StyledDiv key={idx} backgroundImage={unit.image} likeImage={'/images/like.svg'}>
            <span className="title">{unit.movieName}</span>
            <div className="genre">{showGenre(unit.genre)}</div>
            <span className="sub">{unit.releaseDate === null ? '미개봉' : `${unit.releaseDate} 개봉`}</span>
            {unit.releaseDate !== null && (
              <span className="sub">
                {`누적 관객 수: ${numeral(unit.totalAudience).format('0,0')}명 (${unit.grade}/10)`}
              </span>
            )}

            <div className="sub-introduce">{convertEnterToLine(unit.subIntro)}</div>
            <div className="like-button">
              <span
                ref={this.domConfettiRefs[idx]}
                onClick={() => {
                  this.showParadise(idx);
                }}
              />
            </div>
          </StyledDiv>
        );
      });
    };

    return <div>{renderMovieList(this.props.movieData)}</div>;
  }
}

export default MovieList;
