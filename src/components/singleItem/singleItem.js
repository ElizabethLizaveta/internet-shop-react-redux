import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Link } from 'react-router-dom'

import { fetchItemById, addItemToBasket } from '../../actions/index'
import { getItemById } from '../../selectors'
import BasketCart from '../basketCart'


class SingleItem extends Component {
    componentDidMount() {
        this.props.fetchItemById(this.props.match.params.id)
    }

    renderFields () {
        const {item} = this.props
        const columnFields = R.compose(
          R.toPairs,
          R.pick([
            'cpu',
            'camera',
            'size',
            'weight',
            'display',
            'battery',
            'memory'
          ])
        )(item)
      
        return columnFields.map(([key, value]) => (
          <div className='column' key={key}>
            <div className='ab-details-title'>
              <p>{key}</p>
            </div>
            <div className='ab-details-info'>
              {value}
            </div>
          </div>
        ))
      }

    renderContent () {
    const {item} = this.props

    return (
      <div className='thumbnail'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              className='img-thumbnail'
              src={item.image}
              alt={item.name}
            />
          </div>
          <div className='col-md-6'>
             {this.renderFields()}
          </div>
        </div>
        <div className='caption-full'>
          <h4 className='pull-right'>${item.price}</h4>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
      </div>
    )
  }

  renderSidebar () {
    const {item, addItemToBasket} = this.props
    return (
      <div>
        <p className='lead'>Quick shop</p>
        <BasketCart />
        <div className='form-group'>
          <h1>{item.name}</h1>
          <h2>${item.price}</h2>
        </div>
        <Link to='/' className='btn btn-info btn-block'>Back to store</Link>
        <button
          type='button'
          className='btn btn-success btn-block'
          onClick={() => addItemToBasket(item.id)}
        >
          Add to cart
        </button>
      </div>
    )
  }

    render () {
        const {item} = this.props
        return (
          <div className='view-container'>
            <div className='container'>
              <div className='row'>
              <div className='col-md-3'>
                  {item && this.renderSidebar()}
                </div>
                <div className='col-md-9'>
                  {item && this.renderContent()}
                </div>
              </div>
            </div>
          </div>
        )
      }
}

const mapStateToProps = state => {
    return {
        item: getItemById(state, state.singleItemPage.id)
    }
}

const mapDispatchToProps = {
    fetchItemById,
    addItemToBasket 
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)