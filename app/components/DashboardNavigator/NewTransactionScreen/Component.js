import React, { Component } from 'react'
import { AppRegistry, Text, TextInput, View, Alert } from 'react-native'
import PropTypes from 'prop-types'

import InputButton from './InputButton'

import { withNavigation } from 'react-navigation'

import styles from './Styles'

const BUTTON_VALUES = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['00', 0, 'back']
];

class NewTransactionFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0
    };
  }

  render() {
    let len = this._getInputLength()
    return (
      <View style={styles.container}>
        <View style={styles.amount}>
          <Text style={this._getDisplayFontSize(len)}>${this.state.inputValue}</Text>
        </View>
        <View style={styles.input}>
          {this._renderInputButtons()}
        </View>
      </View>
    );
  }

  _onInputButtonPressed(input) {
    switch (typeof input) {
      case 'number':
        return this._handleNumberInput(input)
      case 'string':
        if (input === 'back') {
          return this._handleBack(input)
        } else {
          return this._handle00Input(input)
        }
    }
  }

  _getInputLength() {
    return this.state.inputValue.toString().length
  }

  _handleBack(input) {
    let inputValue = this.state.inputValue
    if (inputValue < 10) {
      inputValue = 0
    }
    if (inputValue >= 10) {
      inputValue = Math.floor((this.state.inputValue / 10))
    }
    this.setState({ inputValue })
  }

  _handle00Input(double0) {
    if (this._getInputLength() >= 6) {
      return
    } else {
      let inputValue = (this.state.inputValue * 100) + 0
      this.setState({ inputValue })
    }
  }

  _handleNumberInput(num) {
    if (this._getInputLength() >= 7) {
      return
    } else {
      let inputValue = (this.state.inputValue * 10) + num
      this.setState({ inputValue })
    }
  }

  _getDisplayFontSize(textLength) {
    let fontSize = {fontSize: 100}
    if (textLength >= 4 && textLength <= 6) {
      fontSize = {fontSize: 80}
    } else if (textLength >= 7) {
      fontSize = {fontSize: 65}
    }
    return fontSize
  }

  _renderInputButtons() {
    let inputPad = [];
    for (let i = 0; i < BUTTON_VALUES.length; i++) {
      let row = BUTTON_VALUES[i];
      let buttonRow = [];
      for (let j = 0; j < row.length; j++) {
        let buttonValue = row[j];
        buttonRow.push(
          <InputButton
            value={buttonValue}
            key={`${i}-${j}`}
            onPress={this._onInputButtonPressed.bind(this, buttonValue)} />
        );
      }
      inputPad.push(<View style={styles.inputRow} key={`row-${i}`}>{buttonRow}</View>)
    }
    return inputPad;
  }

}

export default withNavigation(NewTransactionFormComponent)
