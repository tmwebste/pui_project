import React, { Component } from 'react';
import brownBG from '../assets/brownButton.png'
import whiteBG from '../assets/cardButton.png'

class CardButton extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className={this.props.buttonStyle + '-card-div'} >
        {this.props.buttonStyle === 'white' ? ( 
          <button className={this.props.buttonStyle + '-card-button'} name='card-button' onClick={this.props.onclick}>
            <img className='button-img' src={whiteBG} alt='button background'/>
            <p id={this.props.labelID} className='white-card-button-label'>{this.props.label}</p>
          </button>
        ):(
          <button className={this.props.buttonStyle + '-card-button'} name='card-button' onClick={this.props.onclick}>
            <img className='button-img' src={brownBG} alt='button background'/>
            <label id={this.props.labelID} className='brown-card-button-label'>{this.props.label}</label>
          </button>
        )}
      </div>
    )
  }
}

export default CardButton;