import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
const initialState = {
    data: {}
}
const reducer = (state = initialState, action) => {
    switch (action.type){
        case "LOAD":
            return {
                data: action.data
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    account: reducer,
    form: formReducer
})

export const store = createStore(rootReducer)
