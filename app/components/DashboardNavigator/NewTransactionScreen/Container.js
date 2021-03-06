import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateTransaction, sendTransaction } from '../../../store/transaction'

import NewTransactionForm from './Component'

const NewTransactionFormContainer = props =>
  <NewTransactionForm
    updateTransaction={props.updateTransaction}
    sendTransaction={props.sendTransaction}
    inputValue={props.inputValue}
    sending={props.sending} />

const mapStateToProps = state => ({
  inputValue: state.transaction.inputValue,
  sending: state.transaction.sending,
})

const mapDispatchToProps = {
  updateTransaction,
  sendTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTransactionFormContainer)
