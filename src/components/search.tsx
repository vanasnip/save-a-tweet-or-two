import React from 'react';
import searchIcon from '../search.svg'

interface ISearchProps {
    handleTextChange(e: any): any,
    handleSearch(term: string): any,
    term: string,
    placeholder: string
}

function Search({ handleTextChange, term, handleSearch, placeholder }: ISearchProps) {
    return (
        <div className="search-container col-12">
            <input
                type="text"
                placeholder={placeholder}
                onKeyUp={handleTextChange}
                name="search-tweet-api" id=""
                className=" search col-11"
            />
            <button className="search-btn btn col-1" onClick={() => term !== '' ? handleSearch(term) : null}>
                <img className="search-icon" src={searchIcon} alt="search icon" width="30px" height="30px" />
            </button>
        </div>
    );
}

export default Search;
