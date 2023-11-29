// Source for chatgpt messaging: https://rollbar.com/blog/how-to-integrate-chatgpt-with-react/

import { useState, useEffect, Component } from 'react';
import './App.css';
import ServerInterface from './serverInterface';
import MainGame from './pages/mainGame';
import IntroPage from './pages/introPage';
import backgroundimg from './assets/bg.jpg';
import notecardimg from './assets/NoteCard.png';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userMessage: '',
      storyJSON: null,
      storySummary: null,
      characters: null,
      charactersArray: null,
      currentResponse: null,
      messages: [[],[],[],[]],
      playing: false,
    };
  }

  startGame = (event) => {
    this.setState({ playing: true });
  };

  async componentDidMount() {
    try {
      const storyData = await ServerInterface.getStory();
      const characterData = storyData.game.characters;
      const storyDescription = storyData.game.story;
  
      this.setState({
        storyJSON: storyData,
        storySummary: storyDescription,
        characters: characterData,
      }, () => {
        const charactersKeys = Object.keys(this.state.characters).filter(key => key !== 'judge' && key !== '_comments');
        const charactersArray = charactersKeys.map(key => this.state.characters[key]);
        // charactersArray.shift();
        this.setState({
          charactersArray: charactersArray,
        });
      });
      console.log(this.state.charactersArray);
    } catch (error) {
      console.error("Error fetching story data:", error);
    }
  }
  

  getResponse = async (message, index) => {
    // Check if storySummary is not null before accessing its properties
    this.setState({ 
      currentResponse: null,
    });
    console.log("Character Index: ", index);
    if (this.state.storySummary) {
      if (message.length > 0){
        try {
          // Assuming ServerInterface.getCharacterResponse returns a Promise
          let response = await ServerInterface.getCharacterResponse(
            this.state.charactersArray[index],
            message,
            this.state.storySummary
          );
          
          const updatedMessages = this.state.messages;
          const messageObject = { senderMessage: message, characterMessage: response};

          updatedMessages[index].push(messageObject);
         
          this.setState({
            messages: updatedMessages,
            currentResponse: response,
          });
          
          console.log(this.state.messages);

        } catch (error) {
          console.error('Error getting character response:', error);
        }
      }
      else {
        console.log("user did not enter a message");
      }
    } else {
      console.error('Error: storySummary is null');
    }
  };


  render() {
    return (
      <div className='main'>
      <img src={backgroundimg} className='background-img' alt="Background"></img> 
      
        
        {this.state.playing ? (
          <MainGame
            story={this.state.storySummary}
            characters={this.state.charactersArray}
            getResponse={this.getResponse}
            currentResponse={this.state.currentResponse}
            bgImg={notecardimg}
            messages={this.state.messages}
          />
        ) : (
          <IntroPage
            story={this.state.storySummary}
            startGame={this.startGame}
            image={notecardimg}
          />
        )}
      </div>
    );
  }
}


export default App;