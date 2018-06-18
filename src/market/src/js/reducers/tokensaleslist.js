import * as ActionTypes from '../actiontypes'

const TokenSalesListReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TOKEN_SALE:
      const tokenSale = action.tokenSale

      if(tokenSale.amount.toString() === "0"){
        return state;
      }

      const existingTokenSale = state.findIndex(contract => contract.address === tokenSale.address)
      if(existingTokenSale === -1){
        return [tokenSale].concat(state)
      }else{
        state[existingTokenSale] = tokenSale;
        return [].concat(state)
      }
    default:
      return state
  }
};

export default TokenSalesListReducer;
