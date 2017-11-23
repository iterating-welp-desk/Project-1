import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return( 
      <div>
        <input type="text" class="searchTerm" placeholder="What are you looking for?"></input>
        <button onClick={this.props.search}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
