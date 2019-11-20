'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { sbm, save, seen, correct, makeGetNameRequest, createAJAXRequest } from './flashCardRQs.js';
import { CardInput, CardTextarea, CardFront, CardBack, ReviewCard, AddCard } from './index.js';
/*
function AddCard(props) {
    return <div className="textCard">
    	   {props.children}
	</div>;
	}


function Txt(props) {
	 if (props.phrase == undefined) {
	    return <p>Text missing</p>;
	    }
	 else return <p>{props.phrase}</p>;
}
*/

var divStyle = {
  height: "150px"
};
var i = 0;
var j = 0;
var hover = 'hover';
var cardcontainer = 'card-container';

var CreateCardMain = function (_React$Component) {
  _inherits(CreateCardMain, _React$Component);

  function CreateCardMain(props) {
    _classCallCheck(this, CreateCardMain);

    var _this = _possibleConstructorReturn(this, (CreateCardMain.__proto__ || Object.getPrototypeOf(CreateCardMain)).call(this, props));

    _this.handleClickOnCard = function () {
      /*
      if(this.state.card == 'card-container'){
        this.setState({card: 'hover'});
      } else {
        this.setState({card: 'card-container'});
      }
      */

      if (_this.state.value.trim() == _this.state.userCards[j].english) {
        console.log("Correct");
        //card is correct here, so add correct image from mockups
        //I created it in paint and stored on the server - the school server not the one I built
        var doc = document.getElementById('congrats');
        document.getElementById('congrats').textContent = ' ';
        doc.appendChild(document.createElement('img')).src = 'correct.png';
        if (_this.state.card == 'card-container') {
          _this.setState({ card: 'hover' });
          //up date amount seen and correct here - otherwise when you flip
          //the card back it will update it again - only want it to update
          //when you see the back of the card, which is here
          seen(_this.state.userCards[j].malay);
          correct(_this.state.userCards[j].malay);
        } else {
          _this.setState({ card: 'card-container' });
        }
      } else {
        console.log('not correct' + _this.state.value);
        console.log(_this.state.userCards[j].english);
        if (_this.state.card == 'card-container') {
          _this.setState({ card: 'hover' });
          //up date amount seen here - otherwise when you flip
          //the card back it will update it again - only want it to update
          //when you see the back of the card, which is here
          seen(_this.state.userCards[j].malay);
        } else {
          _this.setState({ card: 'card-container' });
        }
      }
    };

    _this.handleClick = function () {
      save();
    };

    _this.goToNextCard = function () {
      //user userCards.length dummy
      var min = 0;
      var max = _this.state.userCards.length;
      var random = Math.floor(Math.random() * (+max - +min)) + +min;
      j = random;
      _this.setState({ card: cardcontainer });
      var seen = _this.state.userCards[random].seen;
      var correct = _this.state.userCards[random].correct;
      var first = Math.max(1, 5 - correct);
      var second = Math.max(1, 5 - seen);
      var third = 5 * ((seen - correct) / (seen + .001));
      console.log("1: " + first + " 2: " + second + " 3: " + third);
      var score = first + second + third;
      var randomNumber = Math.floor(Math.random() * (+15 - +min)) + +min;
      console.log("random: " + random + " score: " + score + " rN: " + randomNumber);
      if (randomNumber <= score) {
        document.getElementById('trans').textContent = _this.state.userCards[random].malay;
        document.getElementById('congrats').textContent = _this.state.userCards[random].english;
      } else {
        _this.goToNextCard();
      }
      /*
      if(i > this.state.userCards.length - 1){
          i = 0;
          document.getElementById('trans').textContent = this.state.userCards[i].malay;
          document.getElementById('congrats').textContent = this.state.userCards[i].english;
          j = i;
          i = i + 1;
      } else {
        //first time through comes here and i = 0
        //have to increase seen and correct somehow
        //if(this.state.userCards[i].seen < some alg)
        document.getElementById('trans').textContent = this.state.userCards[i].malay;
        document.getElementById('congrats').textContent = this.state.userCards[i].english;
        j = i;
        i=i+1;
      }
      */
    };

    _this.handleChange = function (event) {
      _this.setState({ value: event.target.value });
    };

    _this.changeText = function (text) {
      _this.setState({ english: text });
    };

    _this.goToPageTwoState = function () {
      _this.setState({
        addCardPageState: false,
        reviewCardPageState: true
      });
    };

    _this.goToPageOneState = function () {
      _this.setState({
        addCardPageState: true,
        reviewCardPageState: false
      });
    };

    _this.flipCard = function (event) {
      if (event.charCode == 13) {
        console.log(_this.state.value);
        console.log(_this.state.userCards[j].english);
        console.log(j);
        //check if card is correct
        if (_this.state.value.trim() == _this.state.userCards[j].english) {
          console.log("Correct");
          //card is correct here, so add correct image from mockups
          //I created it in paint and stored on the server - the school server not the one I built
          var doc = document.getElementById('congrats');
          document.getElementById('congrats').textContent = ' ';
          doc.appendChild(document.createElement('img')).src = 'correct.png';
          if (_this.state.card == 'card-container') {
            _this.setState({ card: 'hover' });
            //up date amount seen and correct here - otherwise when you flip
            //the card back it will update it again - only want it to update
            //when you see the back of the card, which is here
            seen(_this.state.userCards[j].malay);
            correct(_this.state.userCards[j].malay);
          } else {
            _this.setState({ card: 'card-container' });
          }
        } else {
          console.log('not correct' + _this.state.value);
          console.log(_this.state.userCards[j].english);
          if (_this.state.card == 'card-container') {
            _this.setState({ card: 'hover' });
            //up date amount seen here - otherwise when you flip
            //the card back it will update it again - only want it to update
            //when you see the back of the card, which is here
            seen(_this.state.userCards[j].malay);
          } else {
            _this.setState({ card: 'card-container' });
          }
        }
      }
    };

    _this.state = {
      opinion: "Translated Text",
      value: 'English',
      english: 'English',
      card: 'card-container',
      userCards: [],
      addCardPageState: true,
      reviewCardPageState: false
    };
    _this.checkReturn = _this.checkReturn.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    makeGetNameRequest();
    hover = 'hover';
    cardcontainer = 'card-container';
    return _this;
  }
  //grab user cards, and direct to correct page view.


  _createClass(CreateCardMain, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = '/user/check?Status=user';
      var xhr = createAJAXRequest('GET', url);
      xhr.onload = function () {
        var responseStr = xhr.responseText; // get the JSON string
        console.log(responseStr);
        var object = JSON.parse(responseStr);
        console.log(object + "OBJECT AT makeCheckStatusRequest");
        //  console.log("cards " + object.cards + " rows: " + object.rows);

        if (object.cards === true) {
          this.setState({
            addCardPageState: false,
            reviewCardPageState: true,
            userCards: object.rows
          });
          //for now: (get a good random card? then start algorithm)
          this.goToNextCard();
          /*
          console.log(object.rows[0].malay);
          document.getElementById('trans').textContent = object.rows[0].malay;
          document.getElementById('congrats').textContent = object.rows[0].english;
          */
        } else if (object.cards === false) {
          this.setState({
            addCardPageState: true,
            reviewCardPageState: false
          });
        }
        for (var _i = 0; _i < object.rows.length; _i++) {
          //console.log(object.rows[i]);

          console.log(this.state.userCards[_i].malay);
        }
      }.bind(this);
      xhr.send();
      //document.getElementByClassName('card-container').addEventListener("click", this.handleClickOnCard);
    }
    //handle button clicks and stuff

    //lets do some state transition functions:

    /*
    this.setState({
      card: hover
    }, () => {console.log(this.state.card);});
    */

  }, {
    key: 'render',


    //checkStatus = () => {
    /*
    if (object.cards === 'true') {
      this.setState({
        firstPageState: false,
        secondPageState: true
      })
    } else {
      this.setState({
        firstPageState: true,
        secondPageState: false
      })
    }
    */
    //}
    //<textarea id="inputEng" onChange={this.handleChange} value={this.state.value} onKeyPress={this.checkReturn} />
    //<input id="inputEng" type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.checkReturn}/>

    /**/
    value: function render() {

      if (this.state.addCardPageState === true) {
        // ADD CARD PAGE
        return React.createElement(
          'main',
          null,
          React.createElement(
            'div',
            { id: 'pageContainer' },
            React.createElement(
              'div',
              { id: 'header' },
              React.createElement(
                'div',
                { id: 'headerButtonDiv' },
                React.createElement(
                  'button',
                  { id: 'reviewButton', onClick: this.goToPageTwoState },
                  'Start Review'
                )
              ),
              React.createElement(
                'div',
                { id: 'titleDiv' },
                React.createElement(
                  'p',
                  { id: 'title' },
                  'Bahasa!'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'mainPage' },
              React.createElement(
                'div',
                { className: 'card-body' },
                React.createElement(
                  'div',
                  { className: 'card-side side-front' },
                  React.createElement(
                    'div',
                    { className: 'card-side-container' },
                    React.createElement('textarea', { id: 'inputEng', onChange: this.handleChange, value: this.state.value, onKeyPress: this.checkReturn })
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'card-body' },
                React.createElement(
                  'div',
                  { className: 'card-side side-front' },
                  React.createElement(
                    'div',
                    { className: 'card-side-container' },
                    React.createElement('p', { id: 'outputGoesHere', placeholder: 'translation' })
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { id: 'saveButton' },
              React.createElement(
                'button',
                { id: 'actualSaveButton', onClick: this.handleClick },
                'Save'
              )
            ),
            React.createElement(
              'div',
              { id: 'footer' },
              React.createElement(
                'p',
                { id: 'username' },
                ' username '
              )
            )
          )
        );
      } else if (this.state.reviewCardPageState === true) {
        //  REVIEW CARD PAGE ~~
        return React.createElement(
          'main',
          null,
          React.createElement(
            'div',
            { id: 'pageContainer' },
            React.createElement(
              'div',
              { id: 'header' },
              React.createElement(
                'div',
                { id: 'headerButtonDiv' },
                React.createElement(
                  'button',
                  { id: 'addButton', onClick: this.goToPageOneState },
                  'Add'
                )
              ),
              React.createElement(
                'div',
                { id: 'titleDiv' },
                React.createElement(
                  'p',
                  { id: 'title' },
                  'Bahasa!'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'mainPageTwo' },
              React.createElement(
                'div',
                { className: this.state.card, id: 'card', onClick: this.handleClickOnCard },
                React.createElement(
                  'div',
                  { className: 'card-body' },
                  React.createElement(CardBack, { text: 'back' }),
                  React.createElement(CardFront, { text: 'front' })
                )
              ),
              React.createElement(
                'div',
                { className: 'card-body' },
                React.createElement(
                  'div',
                  { className: 'card-side side-front' },
                  React.createElement(
                    'div',
                    { className: 'card-side-container' },
                    React.createElement('textarea', { id: 'inputEnglish', onChange: this.handleChange, value: this.state.value, onKeyPress: this.flipCard })
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { id: 'saveButton' },
              React.createElement(
                'button',
                { id: 'nextButton', onClick: this.goToNextCard },
                'Next'
              )
            ),
            React.createElement(
              'div',
              { id: 'footer' },
              React.createElement(
                'p',
                { id: 'username' },
                ' username '
              )
            )
          )
        );
      }
    }

    /*
    <div className='card-side side-front' style={{"height" : "100px"}}>
      <div className='card-side-container' style={{"height" : "100px"}}>
        <textarea  onChange={this.handleChange} value={this.state.value} onKeyPress={this.checkReturn}/>
      </div>
    </div>
    <AddCard>
      <textarea id="inputEnglish" onChange={this.handleChange} value={this.state.value} onKeyPress={this.checkReturn} />
    </AddCard>
    */
    // end of render function
    // onKeyPress function for the textarea element
    // When the charCode is 13, the user has hit the return key

  }, {
    key: 'checkReturn',
    value: function checkReturn(event) {
      if (event.charCode == 13) {
        sbm();
      }
    }
  }]);

  return CreateCardMain;
}(React.Component); // end of class


ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementById('root'));

