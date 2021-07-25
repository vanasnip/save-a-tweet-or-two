import React, { useState } from 'react';
import './App.css';
import Results from './components/results';
import ResultsHeader from './components/resultsHeader';
import Search from './components/search'
import dummyData from './dummyData';
import {ITweet} from './interfaces'

function App() {
  const [term, setTerm] = useState('')
  const [tweets, setTweets] = useState<ITweet[]>([])
  const [saved, setSaved] = useState<ITweet[]>([])
  const [savedLog, setSavedLog] = useState({})

  async function handleSearch(term: string) {
    const { statuses }: any = dummyData
    // const res = await fetch('https://secret-dusk-30723.herokuapp.com/tweet?query=lovable',
    console.log({
      isArray: Array.isArray(statuses),
      statuses
    })
    setTweets(statuses)
  }

  const handleTextChange = (e: any) => {
    const { target: { value }, code } = e
    setTerm(value)
    if (value !== '' && code === 'Enter') handleSearch(term)
  }
  const handleSave = ( tweet: ITweet) => {
    setSaved([ ...saved, tweet ])
    const obj:any = {}
    const myString: string = '' + tweet.id
    obj[myString] = tweet.id
    setSavedLog({ ...savedLog, ...obj})
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
          />
          {/* results */}
          <div className="results-container">
            <ResultsHeader />
            <Results key="search" tweets={tweets.filter( tweet=> !savedLog.hasOwnProperty(''+tweet.id) )} allowDrop={false} />
          </div>
        </div>

        <div className="saved-tweets col-12 col-lg-6">
          <h3>saved Tweets</h3>
          <Results key="saved" tweets={saved} allowDrop={true} handleSave={handleSave} />
          {/* search  
              delete
        */}
          {/* saved */}
        </div>

      </div>
    </div>
  );
}

export default App;
