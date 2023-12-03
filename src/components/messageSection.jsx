import React, { Component } from 'react';
import Message from './message';
import sideBG from '../assets/sideBG.png'

class MessageSection extends Component {
  constructor() {
    super();
  }

  renderMessages() {
    const messagesToRender = Object.values(this.props.messages).filter(message => message && message.senderMessage);
  
    return messagesToRender.map((message, index) => {
      const { senderMessage, characterMessage } = message; // Extracting necessary data
      
      return (
        <div key={index}>
          <p>Sender: {senderMessage}</p>
          {characterMessage ? (
            <p>Character: {characterMessage}</p>
            /* You can modify this to display specific properties of characterMessage */
          ):(
            <p>Character: '...'</p>
          )}
          {/* You can add additional components or content related to each message */}
          {/* <Message /> */}
        </div>
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