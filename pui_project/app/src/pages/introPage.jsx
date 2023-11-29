import React, { Component } from 'react';

class IntroPage extends Component {
  constructor() {
    super();
    this.state = {
      instructions: 'Welcome to our online murder mystery game! In this immersive experience, you\'ll step into the shoes of a detective and work to solve a perplexing murder case. Start by acquainting yourself with the characters and their motives. Select a character to interrogate by typing questions in the text box. Be observant and collect evidence. When you believe you have enough evidence, click the accuse button on the character you believe is guilty.The game will respond – if you\'re right, you\'ll solve the murder and win. ',
      gameIntro: true,

    }
  }

  goToStory = () => {
    this.setState({ gameIntro: false });
  };

  render() {
    return (
      <div className="gameIntro">
        <img className='main-notecard' src={this.props.image} alt="background"/>
        {/* <h1>Murder Mystery</h1> */}
        {this.props.story != null ? (
          this.state.gameIntro ? (
            <section className="intro">
              {this.state.instructions}
              <button onClick={this.goToStory}>Continue</button>
            </section>
          ) : (
            <section className="intro">
              <p className="synopsis">{this.props.story.synopsys}</p>
              <p>Weapon:</p>
              <p>{this.props.story.evidence.weapon}</p>
              <button onClick={this.props.startGame}>Start Game</button>
            </section>
          )
        ) : (
          <p>Loading data</p>
        )}
      </div>
    );
  }
}

export default IntroPage;