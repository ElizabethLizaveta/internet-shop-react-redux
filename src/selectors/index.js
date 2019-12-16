import * as R from 'ramda'

export const getItemById = (state, id) => R.prop(id, state.items)

export const getActiveCategoryId = ownProps => R.path(['match', 'params', 'id'], ownProps)

export const getItems = (state, ownProps) => {
    const activeCategoryId = getActiveCategoryId(ownProps)

    const applySearch = item => R.contains(
        state.itemsPage.search,
        R.prop('name', item)
    )
    const applyCategory = item => R.equals(
        getActiveCategoryId(ownProps),
        R.prop('categoryId', item)
      )
    const items = R.compose(
  R.filter(applySearch),
  R.when(R.always(activeCategoryId), R.filter(applyCategory)),
  R.map(id => getItemById(state, id))
)(state.itemsPage.ids)

    return items
}

export const getRenderedItemsLength = state => R.length(state.itemsPage.ids)

export const getTotalBasketCount = state => R.length(state.basket)

export const getTotalBasketPrice = state => {
    const totalPrice = R.compose(
        R.sum,
        R.pluck('price'),
        R.map(id => getItemById(state, id))
    )(state.basket)

    return totalPrice
}

export const getCategories = state => R.values(state.categories)

export const getBasketPhonesWithCount = state => {
    const phoneCount = id => R.compose(
        R.length,
        R.filter(basketId => R.equals(id, basketId))
      )(state.basket)
      const phoneWithCount = phone => R.assoc('count', phoneCount(phone.id), phone)
    
      const uniqueIds = R.uniq(state.basket)
      const items = R.compose(
        R.map(phoneWithCount),
        R.map(id => getItemById(state, id))
      )(uniqueIds)

    return items
  }