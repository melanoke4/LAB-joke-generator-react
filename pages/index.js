import { useState } from 'react';
import getJoke from '../api/jokeData';

function Home() {
  const getAJokeText = 'Get a Joke';
  const getPunchlineText = 'Get Punchline';
  const getAnotherJokeText = 'Get Another Joke';

  const [buttonText, setButtonText] = useState(getAJokeText);
  const [setupText, setSetupText] = useState('');
  const [punchlineText, setPunchlineText] = useState('');
  const [shouldShowPunchline, setShouldShowPunchline] = useState(false);

  const handleClick = () => {
    if (buttonText.includes(getAJokeText)) {
      getJoke()
        .then((joke) => {
          setSetupText(joke.setup);
          setPunchlineText(joke.delivery);
          setButtonText(getPunchlineText);
        });
    } else if (buttonText.includes(getPunchlineText)) {
      setShouldShowPunchline(true);
      setButtonText(getAnotherJokeText);
    } else if (buttonText.includes(getAnotherJokeText)) {
      getJoke()
        .then((joke) => {
          setShouldShowPunchline(false);
          setSetupText(joke.setup);
          setPunchlineText(joke.delivery);
          setButtonText(getPunchlineText);
        });
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <>{setupText}</> <br />
      <>{shouldShowPunchline ? punchlineText : ''}</>
      <button type="button" onClick={handleClick}>{buttonText}</button>
    </div>
  );
}

export default Home;
