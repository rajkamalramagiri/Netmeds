import { CREATE_TEMPLATE, CREATE_RECORDS, UPDATE_RECORDS, DELETE_RECORDS,UPDATE_TEMPLATE } from './rootFormTypes.js';

export const createTemplate = (obj) => {
    return {
        type: CREATE_TEMPLATE,
        payload: obj
    }
}

export const updateTemplate = (obj) => {
    return {
        type: UPDATE_TEMPLATE,
        payload: obj
    }
}

export const createRecord = (obj) => {
    return {
        type: CREATE_RECORDS,
        payload: obj
    }
}

export const updateRecords = (obj) => {
    return {
        type: UPDATE_RECORDS,
        payload: obj
    }
}

export const deleteRecords = (obj) => {
    return {
        type: DELETE_RECORDS,
        payload: obj
    }
}