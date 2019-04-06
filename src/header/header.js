import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-right: 2rem;
  padding-left: 2rem;

  > span {
    line-height: 2;
    font-size: 5rem;
    font-weight: bold;
    color: #7f7f7f;
    transition: 0.25s;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }
`;

class Header extends Component {
  render() {
    return (
      <HeaderDiv>
        <span>{this.props.headerMessage}</span>
      </HeaderDiv>
    );
  }
}

export default Header;
