import React, { Component } from 'react';

class SearchBar extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return( 
      <div>
        <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={this.props.onSearchChange} ></input>
        <button onClick={this.props.search}>Search</button>
      </div>
    )
  }
  
}

export default SearchBar;