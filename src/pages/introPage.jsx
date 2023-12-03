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
              {/* {this.state.instructions} */}
              <h1>Instructions:</h1>
              <ol className='instructions'>
                <li>Understand the Premise: Get acquainted with the game's theme and storyline. You'll be stepping into the role of a detective to solve a murder mystery.</li><br></br>
                <li>Familiarize Yourself with Characters: Study the characters involved in the game and their potential motives. Each character holds clues that could aid in solving the mystery.</li><br></br>
                <li>Choose a Character to Interrogate: Start by selecting a character to question. Type your inquiries in the text box to gather information and clues. Be strategic in your questioning.</li><br></br>
                <li>Observe Carefully: Pay close attention to the details. Look for any inconsistencies, suspicious behavior, or hints dropped by the characters during your interrogation.</li><br></br>
                <li>Collect Evidence: As you interact and investigate, gather evidence.</li><br></br>
                <li>Make Your Accusation: When you're confident you've gathered sufficient evidence and have a prime suspect in mind, click the "Accuse" button on the character you believe is guilty.</li><br></br>
                <li>Await the Game's Response: The game will react to your accusation. If your choice is correct, you'll successfully solve the murder mystery and emerge victorious!</li><br></br>
              </ol>

              <button onClick={this.goToStory}>Continue</button>
            </section>
          ) : (
            <section className="intro">
              <h1>Story:</h1>
              <p className="synopsis">{this.props.story.synopsys}</p>
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