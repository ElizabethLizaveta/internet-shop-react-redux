import {combineReducers} from 'redux';
 import {connectRouter} from 'connected-react-router';
import items from './items';
import itemsPage from './itemsPage';
import singleItemPage from './singleItemPage';
import basket from './basket'
import categories from './categories'

export default history => combineReducers({
        items,
        itemsPage,
        singleItemPage,
        basket,
        categories,
        router: connectRouter(history)
    })
