import * as R from 'ramda'
import items from './mockItems'
import categories from './mockCategories'


export const fetchItemsApi = async() => {
    return new Promise(resolve => {
        resolve(items)
        // reject('error')
    })
}

export const loadMoreItemsApi = async({offset}) => {
    return new Promise(resolve => {
        resolve(items)
        // reject('error')
    })
}

export const fetchItemByIdApi = async (id) => {
    return new Promise((resolve, reject) => {
      const item = R.find(R.propEq('id', id), items)
      resolve(item)
    })
  }

  export const fetchCategoriesApi = async () => {
    return new Promise((resolve, reject) => {
      resolve(categories)
    })
  }
