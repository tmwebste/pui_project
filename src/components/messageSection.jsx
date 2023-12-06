import React, { Component } from 'react';
import sideBG from '../assets/sideBG.png'

class MessageSection extends Component {
  constructor() {
    super();
  }

  // Display the messages passed to this component
  renderMessages() {
    const messagesToRender = Object.values(this.props.messages).filter(message => message && message.senderMessage);
  
    return messagesToRender.map((message, index) => {
      const { senderMessage, characterMessage } = message;
      
      return (
        <section className='message-section' key={index}>
          {/* Render sender and character messages differently */}
          
          <p>Sender: {senderMessage}</p>
          {characterMessage ? (
            <p>Character: {characterMessage}</p>
          ):(
            <p>Character: ...</p>
          )}
        </section>


      );
    });
  }

  render() {
    return(
      <section className='message-section'>
        <img className='messagesBG' src={sideBG} alt='small clipboard'></img>
        <section className='messages'>
          {this.props.messages.length > 0 ? ( 
            <section>
              {this.renderMessages()}
            </section>
          ):(
            <p>No Messages</p>

          )}
          
        </section>
      </section>
    )
  }
}


export default MessageSection;