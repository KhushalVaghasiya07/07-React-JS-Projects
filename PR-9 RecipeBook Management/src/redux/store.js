import { createStore } from 'redux'
import rootReducer from './reducer'

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('recipeState')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    return undefined
  }
}

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('recipeState', serializedState)
  } catch (err) {
    console.error("Could not save state", err)
  }
}

const persistedState = loadState()

const store = createStore(
  rootReducer,
  persistedState
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store