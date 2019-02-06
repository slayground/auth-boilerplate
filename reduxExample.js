console.clear();

// ACTIONS: forms from customers
// People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
  return { // Action (a form in insurance term)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  }
}

// Removing a form from the database
const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
}

// Create a claim, customers claiming money from the insurance company
const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  }
}

// REDUCERS: departments

const claimHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about the form
    return [...oldListOfClaims, action.payload];
  }
  
  // we don't give a shit
  return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney
  }
}

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name]
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => (name !== action.payload.name))
  } else {
    return listOfPolicies
  }
}

const { createStore, combineReducers } = Redux;

const departments = combineReducers({
  accounting: accounting,
  claimHistory: claimHistory,
  policies: policies
})

const store = createStore(departments);

// example: create an action

store.dispatch(createPolicy('Alex', 45))
store.dispatch(createPolicy('Jason', 23))
store.dispatch(createPolicy('Malcolm', 7))

store.dispatch(createClaim('Alex', 10))
store.dispatch(createClaim('Malcolm', 20))

store.dispatch(deletePolicy('Jason'))

console.log(store.getState());
