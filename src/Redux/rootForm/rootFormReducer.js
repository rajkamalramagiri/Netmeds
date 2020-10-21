import { CREATE_TEMPLATE, CREATE_RECORDS, UPDATE_RECORDS, DELETE_RECORDS, UPDATE_TEMPLATE } from './rootFormTypes.js';

const initialState = {
    forms: {
    },
    records: []
}

const rootFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEMPLATE:
            let list = state;
            list.forms[action?.payload?.formName] = {
                metaData: action?.payload?.formFields
            }
            state = list;
            return state;
        case UPDATE_TEMPLATE:
            let temp = state.forms;
            var finalArr = [];
            action.payload.formFields.forEach((element, index) => {
                let finalObj = {};
                finalObj['type'] = element['type'];
                finalObj['displayLabel'] = element['displayLabel'];
                finalObj['label'] = element['displayLabel'] + '_' + index;
                finalObj['index'] = index;
                finalArr.push(finalObj);
            })
            temp[action.payload.formName]['metaData'] = finalArr;
            state.forms[action.payload.formName]['metaData'] = temp[action.payload.formName]['metaData'];
            return state;
        case CREATE_RECORDS:
            let tempList = state;
            tempList.records.push(action.payload)
            return state
        case UPDATE_RECORDS:
            let toUpdateArr = [...state.records];
            let toUpdateindex = toUpdateArr.findIndex(({ id }) => id === action.payload.id);
            toUpdateArr[toUpdateindex] = action.payload;
            state.records = [...toUpdateArr]
            return state
        case DELETE_RECORDS:
            let toDelArray = [...state.records];
            let toDelindex = toDelArray.findIndex(({ id }) => id === action.payload.id);
            toDelArray.splice(toDelindex, 1);
            state.records = [...toDelArray]
            return state
        default:
            return state
    }
}

export default rootFormReducer