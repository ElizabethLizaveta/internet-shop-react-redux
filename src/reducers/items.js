import * as R from 'ramda'

import {
    FETCH_ITEMS_SUCCESS,
    LOAD_ITEMS_SUCCESS,
    FETCH_ITEM_BY_ID_SUCCESS,
} from '../actions/actionTypes'

const initialState = {};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ITEMS_SUCCESS:
            const newValues = R.indexBy(R.prop('id'), payload)
            return R.merge(state, newValues)
        case LOAD_ITEMS_SUCCESS:
            const moreValues = R.indexBy(R.prop('id'), payload)
            return R.merge(state, moreValues)
        case FETCH_ITEM_BY_ID_SUCCESS:
            return R.assoc(payload.id, payload, state)
        default:
            return state
    }
}