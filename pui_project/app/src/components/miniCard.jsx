import React, { Component } from 'react';
import miniCardBG from '../assets/miniCardBG.png'
import pin from '../assets/Pin.png'

class MiniCard extends Component {
  constructor() {
    super();
  }

  handleSelectCharacter = (event) => {
    this.props.selectCharacter(this.props.characterIndex);
  };

  render() {
    const isSelected = this.props.characterIndex === this.props.selectedCharacterIndex;
    const cardStyle = {
      opacity: isSelected ? '50%' : '100%' // Change 'blue' to the color you prefer
    };

    return(
      <section className='miniCard' onClick={this.handleSelectCharacter}>
        <img className='miniCardBG' src={miniCardBG} style={cardStyle} alt='paper texture' />
        <section className='minicard-content'>
          <h3>{this.props.firstName} {this.props.lastName}</h3>
          <p>{this.props.occupation}</p>
        </section>
      </section>
    );
  }
}

export default MiniCard;