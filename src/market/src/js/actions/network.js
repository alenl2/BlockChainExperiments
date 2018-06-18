import Network from '../network'
import ErrorActions from './errors'
import * as ActionTypes from '../actiontypes'

const NetworkActions = {
  connectionSucceeded() {
    return { type: ActionTypes.CONNECTION_SUCCEEDED }
  },

  connectionFailed() {
    return { type: ActionTypes.CONNECTION_FAILED }
  },

  couldAccessAccount() {
    return { type: ActionTypes.COULD_ACCESS_ACCOUNT }
  },

  couldNotAccessAccount() {
    return { type: ActionTypes.COULD_NOT_ACCESS_ACCOUNT }
  }
}

export const checkAccountAccess = () => async dispatch => {
  try {
    const addresses = await Network.getAccounts()
    addresses[0] ? //TODO: should I use coinbase?
      dispatch(NetworkActions.couldAccessAccount()) :
      dispatch(NetworkActions.couldNotAccessAccount())
  } catch(error) {
    dispatch(ErrorActions.show(error))
  }
};

export const checkConnection = () => async dispatch => {
  Network.web3().isConnected() ?
  dispatch(NetworkActions.connectionSucceeded()) :
  dispatch(NetworkActions.connectionFailed())
};