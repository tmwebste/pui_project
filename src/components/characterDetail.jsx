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
        <h2>{this.props.character.background.firstName + " " + this.props.character.background.lastName}</h2>
        <p>{this.props.character.background.occupation}</p>
        <p>{this.props.character.background.backstory}</p>
        <p>{this.props.character.background.bias}</p>
        { this.props.messages.length > 0 ? (
          <section className='accuse-button'>
          <CardButton
            buttonStyle = 'white'
            label = 'Accuse'
            labelID = 'accuse-button-label'
            onclick = {this.props.accuseFunction}
          />
          </section>
        ):(
          <p>Message this character to unlock the ability to accuse them.</p>
        )
        }
      </section>
    )
  }
}

export default CharacterDetails;