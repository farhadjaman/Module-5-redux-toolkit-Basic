const { createStore } = require('redux');
const { produce } = require('immer');

//initial state
const initialState = {
  name: 'John',
  address: {
    city: 'New York',
    country: 'USA'
  }
}

//action creators
const changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    payload: name
  }
}

const changeCity = (city) => {
  return {
    type: 'CHANGE_CITY',
    payload: city
  }
}

//reducers without immer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name: action.payload
//       }
//     case 'CHANGE_CITY':
//       return {
//         ...state,
//         address: {
//           ...state.address,
//           city: action.payload
//         }
//       }
//     default:
//       return state
//   }
// }


//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return produce(state, (draftState) => {  //produce recieves the current state and a function that returns the next state
        draftState.name = action.payload
      })
    case 'CHANGE_CITY':
      return produce(state, (draftState) => {
        draftState.address.city = action.payload
      })
    default:
      return state
  }
}

//store
const store = createStore(reducer)

//subscribe to state changes
store.subscribe(() => {
  console.log(store.getState());
}
)

//dispatch actions
store.dispatch(changeName('Mary'))

store.dispatch(changeCity('Boston'))

// Path: think-in-a-redux-way\redux\index.js