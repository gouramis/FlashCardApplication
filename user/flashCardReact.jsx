'use strict'
import {sbm, save, seen, correct, makeGetNameRequest, createAJAXRequest} from './flashCardRQs.js'
import {CardInput, CardTextarea, CardFront, CardBack, ReviewCard, AddCard} from './index.js'
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

let divStyle = {
  height: "150px"
};
let i = 0;
let j = 0;
let hover = 'hover';
let cardcontainer = 'card-container';
class CreateCardMain extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        opinion: "Translated Text",
        value: 'English',
        english: 'English',
        card: 'card-container',
        userCards: [],
        addCardPageState: true,
        reviewCardPageState: false
      }
      this.checkReturn = this.checkReturn.bind(this);
      this.handleChange = this.handleChange.bind(this);
      makeGetNameRequest();
      hover = 'hover';
      cardcontainer = 'card-container';
    }
    //grab user cards, and direct to correct page view.
    componentDidMount(){
      let url = '/user/check?Status=user';
      let xhr = createAJAXRequest('GET', url);
      xhr.onload = function() {
        let responseStr = xhr.responseText;  // get the JSON string
        console.log(responseStr);
        let object = JSON.parse(responseStr);
        console.log(object + "OBJECT AT makeCheckStatusRequest");
      //  console.log("cards " + object.cards + " rows: " + object.rows);

        if(object.cards === true){
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
        for(let i = 0; i < object.rows.length; i++)
        {
          //console.log(object.rows[i]);

          console.log(this.state.userCards[i].malay);
        }
      }.bind(this);
      xhr.send();
      //document.getElementByClassName('card-container').addEventListener("click", this.handleClickOnCard);
    }
    handleClickOnCard = () => {
      /*
      if(this.state.card == 'card-container'){
        this.setState({card: 'hover'});
      } else {
        this.setState({card: 'card-container'});
      }
      */

      if(this.state.value.trim() == this.state.userCards[j].english){
        console.log("Correct");
        //card is correct here, so add correct image from mockups
        //I created it in paint and stored on the server - the school server not the one I built
        let doc = document.getElementById('congrats');
        document.getElementById('congrats').textContent = ' ';
        doc.appendChild(document.createElement('img')).src = 'correct.png';
        if(this.state.card == 'card-container'){
          this.setState({card: 'hover'});
          //up date amount seen and correct here - otherwise when you flip
          //the card back it will update it again - only want it to update
          //when you see the back of the card, which is here
          seen(this.state.userCards[j].malay);
          correct(this.state.userCards[j].malay);
        } else {
          this.setState({card: 'card-container'});
        }


      } else {
          console.log('not correct' + this.state.value);
          console.log(this.state.userCards[j].english);
        if(this.state.card == 'card-container'){
          this.setState({card: 'hover'});
          //up date amount seen here - otherwise when you flip
          //the card back it will update it again - only want it to update
          //when you see the back of the card, which is here
          seen(this.state.userCards[j].malay);
        } else {
          this.setState({card: 'card-container'});
        }
      }

    }
    //handle button clicks and stuff
    handleClick = () => {
      save();
    }
    goToNextCard = () => {
      //user userCards.length dummy
      let min=0;
      let max=this.state.userCards.length;
      let random = Math.floor(Math.random() * (+max - +min)) + +min;
      j = random;
      this.setState({ card: cardcontainer });
      let seen = this.state.userCards[random].seen;
      let correct = this.state.userCards[random].correct;
      let first = Math.max(1,5-correct);
      let second = Math.max(1,5-seen);
      let third = 5*((seen - correct) / (seen + .001));
      console.log("1: " + first + " 2: " + second + " 3: " + third);
      let score = ( first + second + third );
      let randomNumber = Math.floor(Math.random() * (+15 - +min)) + +min;
      console.log("random: " + random + " score: " + score + " rN: " + randomNumber);
      if ( randomNumber <= score ){
        document.getElementById('trans').textContent = this.state.userCards[random].malay;
        document.getElementById('congrats').textContent = this.state.userCards[random].english;
      } else {
        this.goToNextCard();
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
    }
    handleChange = (event) => {
      this.setState({value: event.target.value})
    }
    changeText = (text) => {
      this.setState({english: text});
    }
    //lets do some state transition functions:
    goToPageTwoState = () => {
      this.setState({
        addCardPageState: false,
        reviewCardPageState: true
      });
    }
    goToPageOneState = () => {
      this.setState({
        addCardPageState: true,
        reviewCardPageState: false
      });
    }
    /*
    this.setState({
      card: hover
    }, () => {console.log(this.state.card);});
    */
    flipCard = (event) => {
      if (event.charCode == 13) {
        console.log(this.state.value);
        console.log(this.state.userCards[j].english);
        console.log(j);
        //check if card is correct
        if(this.state.value.trim() == this.state.userCards[j].english){
          console.log("Correct");
          //card is correct here, so add correct image from mockups
          //I created it in paint and stored on the server - the school server not the one I built
          let doc = document.getElementById('congrats');
          document.getElementById('congrats').textContent = ' ';
          doc.appendChild(document.createElement('img')).src = 'correct.png';
          if(this.state.card == 'card-container'){
            this.setState({card: 'hover'});
            //up date amount seen and correct here - otherwise when you flip
            //the card back it will update it again - only want it to update
            //when you see the back of the card, which is here
            seen(this.state.userCards[j].malay);
            correct(this.state.userCards[j].malay);
          } else {
            this.setState({card: 'card-container'});
          }


        } else {
            console.log('not correct' + this.state.value);
            console.log(this.state.userCards[j].english);
          if(this.state.card == 'card-container'){
            this.setState({card: 'hover'});
            //up date amount seen here - otherwise when you flip
            //the card back it will update it again - only want it to update
            //when you see the back of the card, which is here
            seen(this.state.userCards[j].malay);
          } else {
            this.setState({card: 'card-container'});
          }
        }
      }
    }


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
  render() {



    if( this.state.addCardPageState === true ) {
      // ADD CARD PAGE
      return (
        <main>
          <div id="pageContainer">
            <div id="header">
              <div id="headerButtonDiv">
                <button id="reviewButton" onClick={this.goToPageTwoState}>Start Review</button>
              </div>
              <div id="titleDiv">
                <p id="title">Bahasa!</p>
              </div>
            </div>
    			  <div className="mainPage">

            <div className='card-body'>
              <div className='card-side side-front'>
                <div className='card-side-container'>
                  <textarea id="inputEng" onChange={this.handleChange} value={this.state.value} onKeyPress={this.checkReturn} />
                </div>
              </div>
            </div>

            <div className='card-body'>
              <div className='card-side side-front'>
                <div className='card-side-container' >
                  <p id="outputGoesHere" placeholder='translation'></p>
                </div>
              </div>
            </div>

    			  </div>
            <div id="saveButton">
    			     <button id="actualSaveButton" onClick={this.handleClick}>Save</button>
            </div>
            <div id="footer">
              <p id="username"> username </p>
            </div>
          </div>
        </main>
      );
    } else if ( this.state.reviewCardPageState === true ) {
      //  REVIEW CARD PAGE ~~
        return(
          <main>
            <div id="pageContainer">
              <div id="header">
                <div id="headerButtonDiv">
                  <button id="addButton" onClick={this.goToPageOneState}>Add</button>
                </div>
                <div id="titleDiv">
                  <p id="title">Bahasa!</p>
                </div>
              </div>

      			  <div className="mainPageTwo">

                <div className={this.state.card} id="card" onClick={this.handleClickOnCard}>
                  <div className='card-body'>
                    <CardBack text="back"/>
                    <CardFront text="front"/>
                  </div>
                </div>
                <div className='card-body'>
                  <div className='card-side side-front'>
                    <div className='card-side-container'>
                      <textarea id="inputEnglish" onChange={this.handleChange} value={this.state.value} onKeyPress={this.flipCard} />
                    </div>
                  </div>
                </div>
              </div>

              <div id="saveButton">
      			    <button id="nextButton" onClick={this.goToNextCard}>Next</button>
              </div>
              <div id="footer">
                <p id="username"> username </p>
              </div>
            </div>
          </main>
        )
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
  checkReturn(event) {
	 if (event.charCode == 13) {
	    	sbm();
	    }
	 }

} // end of class


ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);
