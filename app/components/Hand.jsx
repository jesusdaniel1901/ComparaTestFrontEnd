import React from 'react';
import createClass from 'create-react-class';
import jQuery from 'jquery'

export default class Hand extends React.Component{
  
  constructor() {
        super();
        this._onClickGetHand = this._onClickGetHand.bind(this);
        this._showCards = this._showCards.bind(this);
    }
    
  _showCards(){
    return this.props.cards.map((card) => {
      return (
          <h4>{card.number} {card.suit}</h4>
          )
    });
  }  
  
  _onClickGetHand(event){
    
    event.preventDefault();
    if(localStorage.getItem('dealder-token') == null){
      alert('please shuffleds the cards first')
      return;
    }
    jQuery.ajax({
      method: 'GET',
      url: `http://localhost:3000/v1/dealer/deal?token=${localStorage.getItem('dealder-token')}`,
      success: (data, textStatus, request) => {
        this.props.secondPlayer == 'true' ? this.props.onSetCardsPlayer2(data) : this.props.onSetCardsPlayer1(data);
      },
      error: (data) => {
        alert('there was an error please select the hand again');
      }
    });
  }
      
  render(){
    const cardsLabels = this._showCards();
    return(
      <div className={this.props.secondPlayer == 'true' ? 'secondPlayer' : ''}>
        <h2>Hand {this.props.handNumber}</h2>
        <button className="btn btn-default" onClick={this._onClickGetHand}>Get hand</button>
        {cardsLabels}
      </div>
    )
  }
};
