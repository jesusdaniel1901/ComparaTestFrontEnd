import React from 'react';
import createClass from 'create-react-class';
import jQuery from 'jquery'
import Hand from 'app/components/Hand';

export default class Board extends React.Component{
  
  constructor() {
        super();
        this.state = {
            cardsPlayer1: [],
            cardsPlayer2: [],
            winnerMessage: ''
        };
        this._onClickWinnerButton = this._onClickWinnerButton.bind(this);
        this._setCardsPlayer1 = this._setCardsPlayer1.bind(this);
        this._setCardsPlayer2 = this._setCardsPlayer2.bind(this);
        this._onClickClearButton = this._onClickClearButton.bind(this);
    }
  
  _onClickShufflesCards(event){
    event.preventDefault();
    jQuery.ajax({
      method: 'POST',
      url: `http://localhost:3000/v1/dealer/deck`,
      success: (data, textStatus, request) => {
        localStorage.setItem('dealder-token', data.token);
        alert('cards shuffleds sucessfully');
      },
      error: (data) => {
        localStorage.removeItem('dealder-token');
        alert('there was an error please select the deck again');
      }
    });
  }
  
  _onClickWinnerButton(event){
    event.preventDefault();
    
    if(this.state.cardsPlayer2.length == 0 || this.state.cardsPlayer1.length == 0){
      alert('Please get the two hands first')
      return;
    }
    var jsonArray = {
    "hands": [
      {
        "cards": [
          { "number": this.state.cardsPlayer1[0].number,  "suit": this.state.cardsPlayer1[0].suit },
          { "number": this.state.cardsPlayer1[1].number,  "suit": this.state.cardsPlayer1[1].suit },
          { "number": this.state.cardsPlayer1[2].number,  "suit": this.state.cardsPlayer1[2].suit },
          { "number": this.state.cardsPlayer1[3].number,  "suit": this.state.cardsPlayer1[3].suit },
          { "number": this.state.cardsPlayer1[4].number,  "suit": this.state.cardsPlayer1[4].suit },
        ]
      },
      {
      "cards" :[
        { "number": this.state.cardsPlayer2[0].number,  "suit": this.state.cardsPlayer2[0].suit },
        { "number": this.state.cardsPlayer2[1].number,  "suit": this.state.cardsPlayer2[1].suit },
        { "number": this.state.cardsPlayer2[2].number,  "suit": this.state.cardsPlayer2[2].suit },
        { "number": this.state.cardsPlayer2[3].number,  "suit": this.state.cardsPlayer2[3].suit },
        { "number": this.state.cardsPlayer2[4].number,  "suit": this.state.cardsPlayer2[4].suit },
      ]
    },
    ]
  }   
    var jsonString = JSON.stringify(jsonArray);
    jQuery.ajax({
      method: 'POST',
      headers: {
        "Content-Type": " application/json",
        "Accept": "application/json"
      },
      type: 'json',
      url: `http://localhost:3000/v1/games/get-winner`,
      data: jsonString,
      success: (data, textStatus, request) => {
        this.setState({
          winnerMessage: data.winner
        })
      },
      error: (data) => {
        alert(data);
      }
    });
  }
  
  _setCardsPlayer1(cards){
    this.setState({
      cardsPlayer1: cards
    }) 
  }
  _setCardsPlayer2(cards){
    this.setState({
      cardsPlayer2: cards
    })  
  }
  
  _onClickClearButton(){
    this.setState({
      cardsPlayer1: [],
      cardsPlayer2: [],
      winnerMessage: ''
    })
    localStorage.removeItem('dealder-token');
  }
      
  render(){
    return(
      <div>
        <h2 className="title">Poker Game</h2>
        <button className="btn btn-default deck-button" onClick={this._onClickShufflesCards}>Shuffles cards</button>
        <div className="row">
          <div className="col-md-6">
            <Hand secondPlayer="false" handNumber="1" onSetCardsPlayer1={this._setCardsPlayer1} cards={this.state.cardsPlayer1} ></Hand>
          </div>
          <div className="col-md-6">
            <Hand secondPlayer="true" handNumber="2" onSetCardsPlayer2={this._setCardsPlayer2} cards={this.state.cardsPlayer2} ></Hand>
          </div>
        </div>
        <div className="row win-section">
          <div className="col-md-12">
            <h2 className="title">Winner section</h2>
            <button className="btn btn-default deck-button" onClick={this._onClickWinnerButton}>Check winner</button>
            <h2 className="title">{this.state.winnerMessage}</h2>
          </div>
        </div>
        <div className="row">
          <div classNam="col-md-12">
            <button className="btn btn-default deck-button" onClick={this._onClickClearButton}>Clear everything</button>
          </div>
        </div>
      </div>
    )
  }
};
