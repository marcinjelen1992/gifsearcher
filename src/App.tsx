import { useState } from 'react'
import './App.css'

const API_KEY = 'HVedzF4TqOLn9xOobw90S2xUBs1GW12S';
const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search?type=gifs&limit=10&api_key='

function App() {
  const [gifUrl, setGifUrl] = useState(null)

  async function fetchRespone(query: string) {
    const response = await fetch(`${SEARCH_URL}${API_KEY}&q=${query}`);
    const { data } = await response.json();
    const randomNumber = Math.floor(Math.random() * 9)
    const url = data[randomNumber].images.downsized_large.url;
    setGifUrl(url)
    console.log(data)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('gif-search');
    console.log(searchQuery);

    if (searchQuery) {
      fetchRespone(searchQuery.toString());
    }
  }



  return (
    <>
      <h1>Gif Searcher</h1>
      <form onSubmit={handleSubmit}>
        <input type="search" name="gif-search"/>
        <button type="reset">resetuj</button>
      </form>
      {gifUrl && <img src={gifUrl} />}
    </>
  )
}

export default App
