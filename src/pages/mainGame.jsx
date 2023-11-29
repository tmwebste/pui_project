import React, { Component } from 'react';
import SideBar from '../components/sideBar';
import MessageSection from '../components/messageSection';
import CharacterDetails from '../components/characterDetail';


class MainGame extends Component {
  constructor() {
    super();
    this.state = {
      selectedCharacterIndex: 0,
      userMessage: '', // State to store the user's input message
    };
  }

  handleInputChange = (event) => {
    this.setState({ userMessage: event.target.value });
  };

  handleMessageSend = () => {
    this.setState({ isLoading: true });
    this.props.getResponse(this.state.userMessage, this.state.selectedCharacterIndex);
    this.setState({
      userMessage: '',
      isLoading: false,
    });
  
  };

  selectCharacter = (index) => {
    this.setState({ selectedCharacterIndex: index });
    console.log(this.props.characters[this.state.selectedCharacterIndex])
  }
  
  render() {
    return (
      <div className="mainGame">
        {/* <h1>Murder Mystery</h1> */}
        {this.props.story != null ? (
          <div>

            <img src={this.props.bgImg} className='main-notecard' alt="Background"></img> 

            {/* <p className='synopsis'>{this.props.story.synopsys}</p>
            <p>Weapon:</p>
            <p>{this.props.story.evidence.weapon}</p> */}
            {/* <p>{this.props.characters.character1.background.backstory}</p> */}

            {/* Replace with SideBar and nest minicards within */}
            <SideBar 
              characters = {this.props.characters}
              selectedCharacterIndex = {this.state.selectedCharacterIndex}
              selectCharacter={this.selectCharacter}
            />

            {/* Add character details */}
            <section className='intro'>
              <CharacterDetails
                character = {this.props.characters[this.state.selectedCharacterIndex]}
              />
            </section>


            {/* Replace with MessageSection and render all previous messages */}
            <input
              type="text"
              value={this.state.userMessage}
              onChange={this.handleInputChange}
            />

            <button className='messageSend'
              onClick={() => this.handleMessageSend()}
              disabled={this.state.isLoading}>
              Send Message
            </button>
            {this.state.isLoading ? (
              <p>Loading...</p>
            ) : this.props.currentResponse != null  && this.props.messages[this.state.selectedCharacterIndex].length > 0 ? (

             
              <p>{this.props.messages[this.state.selectedCharacterIndex][this.props.messages[this.state.selectedCharacterIndex].length - 1].characterMessage.response}</p>
            ) : (
              <p>Awaiting Response...</p>
            )}


          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  }
}

export default MainGame;