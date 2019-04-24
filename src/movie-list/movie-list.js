import React from "react";
import styled from "styled-components";
import numeral from "numeral";
import { confetti } from "dom-confetti";

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: ${props =>
    props.backgroundImage
      ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${props.backgroundImage})`
      : ""};
  background-position: 50% 50%;
  background-size: cover;
  margin: 2rem;
  padding: 2rem;
  transition: 0.25s;

  &:hover {
    padding-top: 8rem;
    padding-bottom: 8rem;

    > div.background {
      height: calc(100% - 8rem) !important;
    }

    > div.sub-introduce {
      display: flex;
      flex-direction: column;
    }
    > div.like-button {
      display: flex;
      justify-content: center;
    }
  }

  > div.background {
  }

  > span.title {
    padding: 0.5rem;
    font-size: 3.5rem;
    color: #61dafb;
    margin-bottom: 2rem;
    cursor: pointer;
  }
  > div.genre {
    padding: 0.5rem;
    display: flex;
    margin-bottom: 1rem;

    > span {
      margin-right: 1rem;
      font-size: 1rem;
      color: #f5f5f5;
    }
  }
  > span.sub {
    padding: 0.5rem;
    font-size: 2rem;
    color: #f5f5f5;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  > div.sub-introduce {
    padding: 0.5rem;
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
          : ""};
      background-position: 50% 50%;
      background-size: cover;
    }
  }
`;

class MovieList extends React.Component {
  domConfettiRefs = this.props.movieData.map(() => React.createRef()); // [dom, dom, dom, dom, dom]

  showParadise = idx => {
    confetti(this.domConfettiRefs[idx].current);
  };

  goToSpecificMovie = name => {
    this.props.history.push(`/${name}`);
  };

  render() {
    const convertEnterToLine = someString => {
      const strings = someString.split("\n");
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
          <StyledDiv key={idx} likeImage={"/images/like.svg"}>
            <div
              style={{
                borderRadius: ".75rem",
                zIndex: -1,
                backgroundPosition: "50% 50%",
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${unit.image})`,
                position: "absolute",
                width: "calc(100% - 4rem)",
                height: "calc(100% - 4rem)",
                opacity: 0.5
              }}
              className="background"
            />
            <span className="title" onClick={() => this.goToSpecificMovie(unit.movieName)}>
              {unit.movieName}
            </span>
            <div className="genre">{showGenre(unit.genre)}</div>
            <span className="sub">{unit.releaseDate === null ? "미개봉" : `${unit.releaseDate} 개봉`}</span>
            {unit.releaseDate !== null && (
              <span className="sub">
                {`누적 관객 수: ${numeral(unit.totalAudience).format("0,0")}명 (${unit.grade}/10)`}
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
