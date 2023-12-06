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
      judgeResponse: [null,null,null,null],
      messages: [[],[],[],[]],
      accused: [false, false, false, false],
      playing: false,
      resultPopUp: false,
    };
  }

  // Handler for proceeding to the main game from the intro
  startGame = (event) => {
    this.setState({ playing: true });
  };

  togglePopUp = () => {
    this.setState((prevState) => ({
      resultPopUp: !prevState.resultPopUp,
    }));
  };

  // Load data from server on load
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
      console.log(this.state.storyJSON);
    } catch (error) {
      console.error("Error fetching story data:", error);
    }
  }
  
  // Handle interactions with server interface
  getResponse = async (message, index) => {
    // Check if storySummary is not null before accessing its properties
    this.setState({ 
      currentResponse: null,
    });

    const updatedMessages = this.state.messages;
    let messageObject = { senderMessage: message};
    updatedMessages[index].push(messageObject);
    
    this.setState({
      messages: updatedMessages,
    });

    console.log("Character Index: ", index);
    if (this.state.storySummary) {
      if (message.length > 0){
        try {
          // Assuming ServerInterface.getCharacterResponse returns a Promise
          let response = await ServerInterface.getCharacterResponse(
            this.state.charactersArray[index],
            message,
            this.state.storySummary,
            'character_response'
          );
          
          const updatedMessages = this.state.messages;
          messageObject = { senderMessage: message, characterMessage: response.response};

          updatedMessages[index][updatedMessages[index].length -1 ]=(messageObject);
         
          this.setState({
            messages: updatedMessages,
            currentResponse: response,
          });
          
          // console.log(this.state.messages[0].length);

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

  // Handle interactions with server interface
  getVerdict = async (messages, index) => {
    // Check if storySummary is not null before accessing its properties

    console.log("Character Index: ", index);
    if (this.state.storySummary) {
      if (messages.length > 0){
        try {
          let response = await ServerInterface.getCharacterResponse(
            this.state.charactersArray[index],
            messages,
            this.state.storySummary,
            'get_verdict'
          );
          
          let updatedAccusedList = this.state.accused;
          updatedAccusedList[index] = true;

          let updatedJudgeResponse = this.state.judgeResponse;
          updatedJudgeResponse[index] = response;
          updatedJudgeResponse[index].responseSentament = (String(updatedJudgeResponse[index].responseSentament).toLowerCase() === 'true');


          this.setState({
            judgeResponse: updatedJudgeResponse,
            accused: updatedAccusedList,
            resultPopUp: true
          });

          console.log(this.state.resultPopUp);
          
        } catch (error) {
          console.error('Error getting judge response:', error);
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

        {/* Show main game or intro */}
        {this.state.playing ? (
          <MainGame
            story={this.state.storySummary}
            characters={this.state.charactersArray}
            getResponse={this.getResponse}
            getVerdict={this.getVerdict}
            currentResponse={this.state.currentResponse}
            judgeResponse={this.state.judgeResponse}
            bgImg={notecardimg}
            messages={this.state.messages}
            accused={this.state.accused}
            resultPopUp={this.state.resultPopUp}
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