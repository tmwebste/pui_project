import React, { Component } from 'react';
import SideBar from '../components/sideBar';
import MessageSection from '../components/messageSection';
import CharacterDetails from '../components/characterDetail';
import CardButton from '../components/cardButton';
import MiniCard from '../components/miniCard';



class MainGame extends Component {
  constructor() {
    super();
    this.state = {
      selectedCharacterIndex: 0,
      userMessage: '', // State to store the user's input message
      showCase: false,
      showMenu: false,
      caseButtonLabel: {true:'Back', false:'View Case'},
      menuButtonLabel: {true:'Back', false:'MENU'},
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

  handleVerdictMessageSend = () => {
    this.setState({ 
      isLoading: true
    });
    this.props.getVerdict(this.props.messages[this.state.selectedCharacterIndex], this.state.selectedCharacterIndex);
    this.setState({
      isLoading: false,
    });
  
  };

  selectCharacter = (index) => {
    this.setState({ selectedCharacterIndex: index });
    console.log(this.props.characters[this.state.selectedCharacterIndex])
  }

  toggleCaseView = () => {
    this.setState({
      showCase: !this.state.showCase,
      showMenu: false,
    })
  }
  
  toggleMenuView = () => {
    this.setState({
      showMenu: !this.state.showMenu,
      showCase: false,
    })
  }

  getGameResult = () => {
    let characterGuilty = (String(this.props.characters[this.state.selectedCharacterIndex].guilty) === 'true');
    
    if (characterGuilty){
      return <h2>You found the culprit. Congratulations!</h2>;
    } else {
      return <h2>You did not find the murderer. Feel free to investigate the other characters.</h2>;
    }
    
  }

  quitGame = () => {
    window.location.reload(false);
  }

  render() {
    return (
      <div className="mainGame">

        {/* Show game if story was successfully loaded from server */}
        {this.props.story != null ? (
          <section className='active-game'>

            <img src={this.props.bgImg} className='main-notecard' alt="Background"></img> 

            {/* Show lefthand bar to display character mini cards for the user to select */}
            <SideBar 
              characters = {this.props.characters}
              selectedCharacterIndex = {this.state.selectedCharacterIndex}
              selectCharacter={this.selectCharacter}
            />

            {/* A button that allows the user to view the case summary */}
            <section className = 'toggle-case-view'>
              <CardButton  
                buttonStyle = 'white'
                label = {this.state.caseButtonLabel[this.state.showCase]} //This button changes labels based on current state
                labelID = 'case-button-label'
                onclick = {this.toggleCaseView}
              />
            </section>

            {/* A button that will show the menu */}
            <section className = 'toggle-menu-view'>
              <CardButton  
                buttonStyle = 'white'
                label = {this.state.menuButtonLabel[this.state.showMenu]} //This button changes labels based on current state
                labelID = 'menu-button-label'
                onclick = {this.toggleMenuView}
              />
            </section>

            {/* Right side area to input and display messages */}
            <section className='message-area'>
              {/* Show current characters mini card */}
              <section className='messages-card'>
                <MiniCard
                  key={this.state.selectedCharacterIndex}
                  characterIndex={this.state.selectedCharacterIndex}
                  firstName={this.props.characters[this.state.selectedCharacterIndex].background.firstName}
                  lastName={this.props.characters[this.state.selectedCharacterIndex].background.lastName}
                  occupation={this.props.characters[this.state.selectedCharacterIndex].background.occupation.charAt(0).toUpperCase() + this.props.characters[this.state.selectedCharacterIndex].background.occupation.slice(1)}
                  selectCharacter={this.selectCharacter}
                  selectedCharacterIndex={this.props.selectedCharacterIndex}
                />
              </section>
              {/* Show the messages for the selected caracter via MEssage Section Component*/}
              <MessageSection
                messages={this.props.messages[this.state.selectedCharacterIndex]}
                userMessage={this.state.userMessage}
                messageInput={this.handleInputChange}
                messageSend={this.handleMessageSend}
                isLoading={this.state.isLoading}
              />
              
              {/* Text entry and send button for user message for character */}
              { !this.props.accused[this.state.selectedCharacterIndex]  ? (
                <section className='message-input'>
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
                </section>
                ):(
                  <section className='message-input'></section>
                )
              }
            </section>

            {/* Show the game menu */}
            { this.state.showMenu ? (
              <section className='options-menu'>
                <h1>Menu:</h1>
                <section className='quit-button'>
                  <CardButton
                    buttonStyle = 'brown'
                    label = 'Exit Game'
                    labelID = 'exit-button-label'
                    onclick = {this.quitGame}
                  />
                </section>
              </section>
            ):(
              // Show the case synopsis
              this.state.showCase ? (
                <section className="intro">
                <p className="synopsis">{this.props.story.synopsys}</p>
                </section>
              ):(

                //* Pop up to show verdict result *
                this.props.resultPopUp && this.props.judgeResponse[this.state.selectedCharacterIndex]?.response ? (
                  <section className='intro'>
                    <h1>Verdict:</h1>
                    <h2>{this.props.judgeResponse[this.state.selectedCharacterIndex].response}</h2>
                    <h1>Truth:</h1>
                    {this.getGameResult()}

                    <section className='quit-button'>
                      <CardButton
                        buttonStyle = 'brown'
                        label = 'Quit Game'
                        labelID = 'quit-button-label'
                        onclick = {this.quitGame}
                      />
                    </section>
                  </section>
                ):(


                // Show the selscted characters details
                  <section className='intro'>
                    <CharacterDetails
                      character = {this.props.characters[this.state.selectedCharacterIndex]}
                      accuseFunction = {this.handleVerdictMessageSend}
                      messages = {this.props.messages[this.state.selectedCharacterIndex]}
                      accused = {this.props.accused[this.state.selectedCharacterIndex]}
                    />
                  </section>
                )
              )

            )}
          </section>
        ) : (
          // Show loading while waiting for game file from server
          <p>Loading data...</p>
        )}
      </div>
    );
  }
}

export default MainGame;