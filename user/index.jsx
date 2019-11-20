/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:

      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
   It was modified by Cameron FitzPatrick for completion of ecs162 assignment
*/


const cardContainer = document.querySelector('.react-card');
// React component for form inputs
export class CardInput extends React.Component {
  render() {
    return(
      <fieldset>
        <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} onChange={this.onChange} placeholder={this.props.placeholder} onKeyPress={this.props.onKeyPress}  required />
      </fieldset>
    )
  }
}
// React component for textarea
export class CardTextarea extends React.Component {
  render() {
    return(
      <fieldset>
        <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} value={this.props.value} onKeyPress={this.props.onKeyPress} required ></textarea>
      </fieldset>
    )
  }
}
// CardInput, CardTextarea, CardFront, CardBack, Card

// React component for the front side of the card
export class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
        <div className='card-side-container'>
             <h2 id='trans'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
export class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <h2 id='congrats'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}
//make otherone not have id - on rhs of add card page
// React component for the card (main component)
export class ReviewCard extends React.Component {
  render() {
    return(
      <div className='card-container'>
        <div className='card-body'>
          <CardBack text="hello"/>
          <CardFront text="wtf"/>
        </div>
      </div>
    )
  }
}


export class AddCard extends React.Component {
  render(){
    return(
        <div className='card-body'>
          <div className='card-side side-front'>
            <div className='card-side-container'>
              <fieldset>
                <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} onChange={this.onChange} placeholder={this.props.placeholder} onKeyPress={this.props.onKeyPress}  required />
              </fieldset>
            </div>
          </div>
        </div>
    )
  }
}
