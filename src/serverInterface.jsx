import React, { Component } from 'react';
import axios from 'axios';



class ServerInterface extends Component {
  constructor() {
    super();
    this.state = {
      SERVER_IP:'https://mystery-server.fly.dev/',
      // SERVER_IP:'http://127.0.0.1:5000/'
    }
  }

  getStory = async () => {
    try {
      const response = await fetch(this.state.SERVER_IP);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      // console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  getCharacterResponse = async (characterProfile, message, synopsis, endpoint) => {
    // characterProfile = JSON.stringify(characterProfile);
    try {
      // Define the request data
      const requestData = {
        message,
        characterProfile, 
        synopsis, 
      };
      console.log(requestData);
      // Make a POST request to the Flask server
      const response = await fetch( this.state.SERVER_IP + endpoint, {
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