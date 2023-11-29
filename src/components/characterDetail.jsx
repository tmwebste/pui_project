import React, { Component } from 'react';
import head from '../assets/head.png'

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
      </section>
    )
  }
}

export default CharacterDetails;