import React, { Component } from 'react';
import MiniCard from './miniCard';
import sideBG from '../assets/sideBG.png'

class SideBar extends Component {
  constructor() {
    super();
  }

  renderMiniCards() {
    const charactersToRender = Object.values(this.props.characters).filter((character, index) => index !== null );
    return charactersToRender.map((character, index) => {
      if (character && character.background) {
        const { firstName, lastName, occupation } = character.background; // Extracting necessary data
        return (
          <MiniCard
            key={index}
            characterIndex={index}
            firstName={firstName}
            lastName={lastName}
            occupation={occupation.charAt(0).toUpperCase() + occupation.slice(1)}
            selectCharacter={this.props.selectCharacter}
            selectedCharacterIndex={this.props.selectedCharacterIndex}
          />
          
        );
      } else {
        // Handle missing or incomplete data for a character more explicitly if needed
        console.error(`Character at index ${index} data is incomplete or missing`, character);
        return null; // You can render a placeholder or handle the missing data accordingly
      }
    });
  }

  render() {
    return(
      <section className='sideBar'>
        <img className='sideBG' src={sideBG} alt='small clipboard'></img>
        <section className='side-mini-cards'>
          {this.renderMiniCards()}
        </section>
      </section>
    )
  }
}

export default SideBar;