import {
    FETCH_ITEMS_START,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
    LOAD_ITEMS_START,
    LOAD_ITEMS_SUCCESS,
    LOAD_ITEMS_FAILURE, 
    FETCH_ITEM_BY_ID_START,
    FETCH_ITEM_BY_ID_SUCCESS,
    FETCH_ITEM_BY_ID_FAILURE,
    ADD_ITEM_TO_BASKET,
    SEARCH_PHONE,
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    REMOVE_PHONE_FROM_BASKET,
    CLEAN_BASKET
} from './actionTypes'

import {fetchItemsApi, loadMoreItemsApi, fetchItemByIdApi, fetchCategoriesApi} from '../api'
import {getRenderedItemsLength} from '../selectors'

export const fetchItems = () => async dispatch => {
    dispatch({
        type: FETCH_ITEMS_START
    })

    try {
        const items = await fetchItemsApi()
        dispatch({
            type: FETCH_ITEMS_SUCCESS,
            payload: items,
        })
    } catch (err) {
        dispatch({
            type: FETCH_ITEMS_FAILURE,
            payload: err,
            error: true
        })
    }
}

export const loadMoreItems = () => async (dispatch, getState) => {
    const offset = getRenderedItemsLength(getState())
    dispatch({
        type: LOAD_ITEMS_START
    })

    try {
        const items = await loadMoreItemsApi(offset)
        dispatch({
            type: LOAD_ITEMS_SUCCESS,
            payload: items,
        })
    } catch (err) {
        dispatch({
            type: LOAD_ITEMS_FAILURE,
            payload: err,
            error: true
        })
    }
}

export const fetchItemById = (id) => async dispatch => {
    dispatch({type: FETCH_ITEM_BY_ID_START})
  
    try {
      const item = await fetchItemByIdApi(id)
      dispatch({
        type: FETCH_ITEM_BY_ID_SUCCESS,
        payload: item
      })
    } catch (err) {
      dispatch({
        type: FETCH_ITEM_BY_ID_FAILURE,
        payload: err,
        error: true
      })
    }
  }

  export const addItemToBasket = id => dispatch => {
    dispatch({
      type: ADD_ITEM_TO_BASKET,
      payload: id
    })
  }

  export const searchPhone = (text) => dispatch => {
    dispatch({
      type: SEARCH_PHONE,
      payload: text
    })
  }

  export const fetchCategories = () => async dispatch => {
    dispatch({type: FETCH_CATEGORIES_START})
  
    try {
      const items = await fetchCategoriesApi()
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: items
      })
    } catch (err) {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: err,
        error: true
      })
    }
  }
  
  export const removePhoneFromBasket = id => async dispatch => {
    dispatch({
      type: REMOVE_PHONE_FROM_BASKET,
      payload: id
    })
  }

  export const cleanBasket = () => dispatch => {
    dispatch({
      type: CLEAN_BASKET
    })
  }
  
  export const basketCheckout = phones => () => {
    alert(JSON.stringify(phones))
  }