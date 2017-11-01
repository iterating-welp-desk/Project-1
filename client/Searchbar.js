import React, { Component } from 'react';

const SearchBar= ()=>{
  return( 
    <div>
      <input type="text" class="searchTerm" placeholder="What are you looking for?"></input>
      <button onClick={this.props.search}>Search</button>
    </div>
  )
}

export default SearchBar;