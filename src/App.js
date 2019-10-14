import React, {Component} from 'react';

import './App.css';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import ResultList from './ResultList/ResultList'

export default class App extends Component {
  state = {
    bookResults: this.props.starterBookResults,
    searchQuery: 'lord+of+the+rings', 
    bookFilter: '', 
    printFilter: ''
  }

  
  handleSearchSubmit = ( searchSubmitEvent, searchInput ) => {
    searchSubmitEvent.preventDefault();
    this.setState({
      searchQuery: searchInput
    });
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes'
    const key = 'AIzaSyAtQRj3afl2jwDviMfK7mWvnZ3BWvtNGeg';
    const formattedSearchUrl = this.formatQuery( baseUrl, searchInput, key );
    fetch( formattedSearchUrl )
      .then(response => {
        if(!response.ok) {
          throw new Error('Something went wrong on the network. Please try again later.');
        }
        return response;
      })
      .then(response => response.json())
      .then(bookResultsObj => {
        console.log(bookResultsObj)
        this.setState({
          bookResults: bookResultsObj,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  formatQuery = ( baseUrl, searchInput, key ) => {
    // e.g. https://www.googleapis.com/books/v1/volumes?q=time&printType=magazines&key=yourAPIKey
    const { bookFilter, printFilter } = this.state;
    let formattedQuery;
    if ( searchInput !== '') {
      formattedQuery = '?q=' + searchInput; 
    }
    if ( bookFilter !== '') {
      formattedQuery = formattedQuery + '&filter=' + bookFilter;
    }
    if ( printFilter !== '') {
      formattedQuery = formattedQuery + '&bookType=' + printFilter;
    }
    const formattedUrl  = baseUrl + formattedQuery + '&key=' + key; 
    console.log('formatted URL: ', formattedUrl);   
    return formattedUrl;    
  }

  handlePrintType = ( printTypeFormEvent ) => {
    if ( printTypeFormEvent ) {
      this.setState({
          printFilter: printTypeFormEvent
      });
    } 
  }

  handleBookType = ( bookTypeFormEvent ) => {
    if ( bookTypeFormEvent ) {
      this.setState({
          bookFilter: bookTypeFormEvent
      });
    } 
  }

  render(){
    const { bookResults } = this.state;
    return (
      <div>
        <header>
          <h1>Google Book Search</h1>
        </header>
        <SearchBar 
          handleSearchSubmit={ this.handleSearchSubmit }/>
        <Filter 
          handlePrintType={ this.handlePrintType }
          handleBookType={ this.handleBookType }
        />
        <ResultList 
          bookResults={ bookResults } 
        />
      </div>
    );
  }
}


