
import { types } from './actionTypes.js'

export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function incrementCount() {
    return {
        type: 'INCREMENT_COUNT'
    };
}

export function decrementCount() {
    return {
        type: 'DECREMENT_COUNT'
    };
}


export const actions = {
    newFile(filePath) {
        return {
            type: types.NEW_FILE,
            payload: { filePath }
        };
    },
    moveFiles(pathToMove, targetPath) {
        return {
            type: types.MOVE_FILES,
            payload: { pathToMove, targetPath }
        };
    },
    deleteFiles(pathToRemove) {
        return {
            type: types.DELETE_FILES,
            payload: { pathToRemove }
        };
    }
};