import React, { Component } from 'react';
import head from '../assets/head.png'
import CardButton from './cardButton';

class CharacterDetails extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <section className='character-details'>
        <img className='character-image' src={head} alt='character'/>
        <h1>{this.props.character.background.firstName + " " + this.props.character.background.lastName}</h1>
        <h2>{this.props.character.background.occupation}</h2>
        <p>{this.props.character.background.backstory}</p>
        <p>{this.props.character.background.bias}</p>
        { !this.props.accused ? (
           this.props.messages.length > 0 ? (
            <section className='accuse-button'>
              <CardButton
                buttonStyle = 'white'
                label = 'Accuse'
                labelID = 'accuse-button-label'
                onclick = {this.props.accuseFunction}
              />
            </section>
          ) : (
            <h3>Message this character to unlock the ability to accuse them.</h3>
          )
          ) : (
            <div className='accused-details'>
              <h1>ACCUSED</h1>
              <p>This character has been accused. You can no longer interact with them. </p>
            </div>
          )
        }
      </section>
    )
  }
}

export default CharacterDetails;