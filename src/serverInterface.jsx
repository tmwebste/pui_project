import React, { Component } from 'react';
import axios from 'axios';



class ServerInterface extends Component {
  constructor() {
    super();
    this.state = {
      SERVER_IP:'https://mystery-server.fly.dev/'
    }
  }

  getStory = async () => {
    try {
      const response = await fetch(this.state.SERVER_IP);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  getCharacterResponse = async (characterProfile, message, synopsys) => {
    // characterProfile = JSON.stringify(characterProfile);
    try {
      // Define the request data
      const requestData = {
        message,
        characterProfile, 
        synopsys, 
      };
      console.log(requestData);
      // Make a POST request to the Flask server
      const response = await fetch( this.state.SERVER_IP + 'character_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      

      if (response.ok) {
        // Parse the JSON response from the server
        const characterResponse = await response.json();
        console.log(characterResponse);
        // Do something with the characterResponse, e.g., update state or display it
        return characterResponse;
      } else {
        // Handle server error
        console.error('Server returned an error');
      }
    } catch (error) {
      // Handle client-side error
      console.error('Client-side error:', error);
    }
  }

  render() {
  }
}

export default new ServerInterface();