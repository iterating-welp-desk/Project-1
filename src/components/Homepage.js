import React, { Component } from 'react';
import List from './List';
import Searchbar from './Searchbar';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Homepage">
          <Searchbar search={this.props.search} onSearchChange={this.props.onSearchChange} />
          <List title={'Relevant Jobs'} />
          <List title={'You have Applied To These Jobs:'} />
      </div>
    )
  }
}

export default Homepage;
