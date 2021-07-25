import { throwStatement } from '@babel/types';
import React, { useState, useEffect } from 'react';
import './App.css';
import Results from './components/results';
import ResultsHeader from './components/resultsHeader';
import Search from './components/search'
import dummyData from './dummyData';
import {ITweet} from './interfaces'
import * as lib from './lib/lib'

function App() {
  const [term, setTerm] = useState('')
  const [tweets, setTweets] = useState<ITweet[]>([])
  const [saved, setSaved] = useState<ITweet[]>([])
  const [savedLog, setSavedLog] = useState({})
  const [savedSearchTerm, setSavedSearchTerm] = useState('')


  useEffect(()=>{
    (async function(){
      const lsSaved: ITweet[] = await lib.LS.get('saved',"[]")
      const lsSavedLog: {} = await lib.LS.get('savedLog',"{}")
      if( lsSaved ) setSaved( lsSaved)
      if( lsSavedLog ) setSavedLog( lsSavedLog )
    }())
  },[])


  async function handleSearch(term: string) {
    // const { statuses }: any = dummyData
    const statuses = fetch(`http://localhost:5000/tweet?query=${term}`)
      .then( response => response.json())
      .then( statuses => {
        setTweets(statuses)
      })

    // const response = await fetch(`https://secret-dusk-30723.herokuapp.com/tweet?query=${term}`)
    // console.log({statuses: statuses.body})
    // const { statuses }  = response
    console.log({
      isArray: Array.isArray(statuses),
      statuses
    })
  }

  const isNotInLog = (id: number) => !savedLog.hasOwnProperty(String(id))

  const handleTextChange = (e: any) => {
    const { target: { value }, code } = e
    setTerm(value)
    if (value !== '' && code === 'Enter') handleSearch(term)
    if ( value === '') setTweets([])
  }
  const handleSavedTextChange = (e: any) => {
    const { target: { value } } = e
    setSavedSearchTerm(value)
  }
  
  const handleSave = ( tweet: ITweet) => {
    if( isNotInLog( tweet.id )){
      const newSaved = [ tweet,...saved ]
      const newSavedLog = {
        [String(tweet.id)]: tweet.id,
        ...savedLog
      }
      lib.LS.set('saved', newSaved)
      lib.LS.set('savedLog', newSavedLog)
      setSaved(newSaved)
      setSavedLog(newSavedLog)
    }
  }

  return (
    <div className="App container">
      <header className="App-header row">
        <h1>Tweet Saver</h1>
      </header>
      <div className="tweet-list-container row">

        <div className="search-tweets col-12 col-lg-6">
          {/* search */}
          <Search
            handleTextChange={handleTextChange}
            term={term}
            handleSearch={handleSearch}
            placeholder="search twitter tweets"
          />
          {/* results */}
          <div className="results-container">
            <ResultsHeader />
            <Results key="search" tweets={tweets.filter( ({ id })=> isNotInLog( id ))} allowDrop={false} />
          </div>
        </div>

        <div className="saved-tweets col-12 col-lg-6">
          <Search
            handleTextChange={handleSavedTextChange}
            term={term}
            handleSearch={()=>{}}
            placeholder="search saved tweets"
          />
          <div className="results-container">
            <ResultsHeader />
            <Results 
              key="saved" 
              tweets={
                saved
                  .filter( (tweet) => {
                    if( savedSearchTerm === '' ) return true
                    const { user: { name, screen_name }, text } = tweet
                    return name.includes(savedSearchTerm) || 
                           screen_name.includes(savedSearchTerm) ||
                           text.includes(savedSearchTerm)
                  } )
              } 
              allowDrop={true} 
              handleSave={handleSave} 
            />
            {/* search  
                delete
          */}
            {/* saved */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
