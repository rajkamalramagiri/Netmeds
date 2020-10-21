import { combineReducers } from 'redux'
import rootFormReducer from './rootForm/rootFormReducer'

const rootReducer = combineReducers({
    form: rootFormReducer
})

export default rootReducer