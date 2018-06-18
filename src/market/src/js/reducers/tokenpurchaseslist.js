import * as ActionTypes from '../actiontypes'

const TokenPurchasesListReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TOKEN_PURCHASE:
      const tokenPurchase = action.tokenPurchase

      if(tokenPurchase.price.toString() === "0"){
        return state;
      }
      const existingTokenPurchase = state.findIndex(contract => contract.address === tokenPurchase.address)

      if(existingTokenPurchase === -1){
        return [tokenPurchase].concat(state)
      }else{
        state[existingTokenPurchase] = tokenPurchase;
        return [].concat(state)
      }
    default:
      return state
  }
};

export default TokenPurchasesListReducer;
