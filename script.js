const addMatchButton = document.querySelector('.lws-addMatch');
const totalValue = document.querySelector('.lws-singleResult');
const incrementForm = document.querySelector('.incrementForm');
const decrementForm = document.querySelector('.decrementForm');
let increment = incrementForm.elements['increment'];
let decrement = decrementForm.elements['decrement'];
const reset = document.querySelector('.lws-reset');
const deleteBtn = document.querySelector('.lws-delete');

addMatchButton.addEventListener('click', () => {
  const currMatch = document.querySelector('.match');
  var clone = currMatch.cloneNode(true);
  currMatch.after(clone);
});

const initialState = {
  value: 0,
};
// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === 'increment') {
    return {
      ...state,
      value: state.value + action.payload.incrementBy,
    };
  } else if (action.type === 'decrement') {
    if (action.payload.decrementBy < 0) {
      action.payload.decrementBy = -action.payload.decrementBy;
    }
    const afterDecmentValue = state.value - action.payload.decrementBy;
    return {
      ...state,
      value: afterDecmentValue < 0 ? 0 : afterDecmentValue,
    };
  } else if (action.type === 'reset') {
    increment.value = '';
    decrement.value = '';
    return {
      ...state,
      value: 0,
    };
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  totalValue.innerText = state.value.toString();
};

// update UI initially
render();

store.subscribe(render);

increment.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    console.log(increment.value);
    store.dispatch({
      type: 'increment',
      payload: {
        incrementBy: Number(increment.value),
      },
    });
  }
});
decrement.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    console.log(decrement.value);
    store.dispatch({
      type: 'decrement',
      payload: {
        decrementBy: Number(decrement.value),
      },
    });
  }
});

reset.addEventListener('click', () => {
  store.dispatch({
    type: 'reset',
  });
});
