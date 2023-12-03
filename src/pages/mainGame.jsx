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
      caseButtonLabel: {true:'Back', false:'View Case'}
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
    })
  }
  
  toggleMenuView = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  quitGame = () => {
    window.location.reload(false);
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

            <section className = 'toggle-case-view'>
              <CardButton  
                buttonStyle = 'white'
                label = {this.state.caseButtonLabel[this.state.showCase]}
                labelID = 'case-button-label'
                onclick = {this.toggleCaseView}
              />
            </section>

            <section className = 'toggle-menu-view'>
              <CardButton  
                buttonStyle = 'white'
                label = 'MENU'
                labelID = 'menu-button-label'
                onclick = {this.toggleMenuView}
              />
            </section>

            <section className='messages-card'>
              <MiniCard
                key={this.state.selectedCharacterIndex}
                characterIndex={this.state.selectedCharacterIndex}
                firstName={this.props.characters[this.state.selectedCharacterIndex].background.firstName}
                lastName={this.props.characters[this.state.selectedCharacterIndex].background.lastName}
                occupation={this.props.characters[this.state.selectedCharacterIndex].background.occupation.charAt(0).toUpperCase() + this.props.characters[this.state.selectedCharacterIndex].background.occupation.slice(1)}
                selectCharacter={this.props.selectCharacter}
                selectedCharacterIndex={this.props.selectedCharacterIndex}
              />
            </section>
            <MessageSection
              messages={this.props.messages[this.state.selectedCharacterIndex]}
            />

            {/* Add character details */}
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
              this.state.showCase ? (
                <section className="intro">
                <p className="synopsis">{this.props.story.synopsys}</p>
                </section>
              ):(
                <section className='intro'>
                  <CharacterDetails
                    character = {this.props.characters[this.state.selectedCharacterIndex]}
                    accuseFunction = {this.handleVerdictMessageSend}
                    messages = {this.props.messages[this.state.selectedCharacterIndex]}
                  />
                </section>
                )

            )}

            {/* Replace with MessageSection and render all previous messages */}
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

          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  }
}

export default MainGame;