var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:

      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
   It was modified by Cameron FitzPatrick for completion of ecs162 assignment
*/

var cardContainer = document.querySelector('.react-card');
// React component for form inputs
export var CardInput = function (_React$Component) {
  _inherits(CardInput, _React$Component);

  function CardInput() {
    _classCallCheck(this, CardInput);

    return _possibleConstructorReturn(this, (CardInput.__proto__ || Object.getPrototypeOf(CardInput)).apply(this, arguments));
  }

  _createClass(CardInput, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'fieldset',
        null,
        React.createElement('input', { name: this.props.name, id: this.props.id, type: this.props.type || 'text', onChange: this.onChange, placeholder: this.props.placeholder, onKeyPress: this.props.onKeyPress, required: true })
      );
    }
  }]);

  return CardInput;
}(React.Component);
// React component for textarea
export var CardTextarea = function (_React$Component2) {
  _inherits(CardTextarea, _React$Component2);

  function CardTextarea() {
    _classCallCheck(this, CardTextarea);

    return _possibleConstructorReturn(this, (CardTextarea.__proto__ || Object.getPrototypeOf(CardTextarea)).apply(this, arguments));
  }

  _createClass(CardTextarea, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'fieldset',
        null,
        React.createElement('textarea', { name: this.props.name, id: this.props.id, placeholder: this.props.placeholder, value: this.props.value, onKeyPress: this.props.onKeyPress, required: true })
      );
    }
  }]);

  return CardTextarea;
}(React.Component);
// CardInput, CardTextarea, CardFront, CardBack, Card

// React component for the front side of the card
export var CardFront = function (_React$Component3) {
  _inherits(CardFront, _React$Component3);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: 'render',
    value: function render(props) {
      return React.createElement(
        'div',
        { className: 'card-side side-front' },
        React.createElement(
          'div',
          { className: 'card-side-container' },
          React.createElement(
            'h2',
            { id: 'trans' },
            this.props.text
          )
        )
      );
    }
  }]);

  return CardFront;
}(React.Component);

// React component for the back side of the card
export var CardBack = function (_React$Component4) {
  _inherits(CardBack, _React$Component4);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: 'render',
    value: function render(props) {
      return React.createElement(
        'div',
        { className: 'card-side side-back' },
        React.createElement(
          'div',
          { className: 'card-side-container' },
          React.createElement(
            'h2',
            { id: 'congrats' },
            this.props.text
          )
        )
      );
    }
  }]);

  return CardBack;
}(React.Component);
//make otherone not have id - on rhs of add card page
// React component for the card (main component)
export var ReviewCard = function (_React$Component5) {
  _inherits(ReviewCard, _React$Component5);

  function ReviewCard() {
    _classCallCheck(this, ReviewCard);

    return _possibleConstructorReturn(this, (ReviewCard.__proto__ || Object.getPrototypeOf(ReviewCard)).apply(this, arguments));
  }

  _createClass(ReviewCard, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'card-container' },
        React.createElement(
          'div',
          { className: 'card-body' },
          React.createElement(CardBack, { text: 'hello' }),
          React.createElement(CardFront, { text: 'wtf' })
        )
      );
    }
  }]);

  return ReviewCard;
}(React.Component);

export var AddCard = function (_React$Component6) {
  _inherits(AddCard, _React$Component6);

  function AddCard() {
    _classCallCheck(this, AddCard);

    return _possibleConstructorReturn(this, (AddCard.__proto__ || Object.getPrototypeOf(AddCard)).apply(this, arguments));
  }

  _createClass(AddCard, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'card-body' },
        React.createElement(
          'div',
          { className: 'card-side side-front' },
          React.createElement(
            'div',
            { className: 'card-side-container' },
            React.createElement(
              'fieldset',
              null,
              React.createElement('input', { name: this.props.name, id: this.props.id, type: this.props.type || 'text', onChange: this.onChange, placeholder: this.props.placeholder, onKeyPress: this.props.onKeyPress, required: true })
            )
          )
        )
      );
    }
  }]);

  return AddCard;
}(React.Component);

