import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Link } from 'react-router-dom';

import Layout from '../layout';
import { fetchItems, loadMoreItems, addItemToBasket,fetchCategories } from '../../actions';
import { getItems } from '../../selectors';

class Items extends Component {
    componentDidMount() {
        this.props.fetchItems()
        this.props.fetchCategories()
    }

    renderItem(item, index) {
        const {addItemToBasket} = this.props
        const shortDescription = `${R.take(60, item.description)}...`

        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
                <div className='thumbnail'>
                    <img
                        className='img-thumbnail'
                        src={item.image}
                        alt={item.name}
                    />
                    <div className='caption'>
                        <h4 className='pull-right'>${item.price}</h4>
                        <h4>
                            <Link to={`/phones/${item.id}`}>
                                {item.name}
                            </Link>
                        </h4>
                        <p>{shortDescription}</p>
                        <p className='itemButton'>
                            <button
                                className='btn btn-primary'
                                onClick={() => addItemToBasket(item.id)}
                            >
                                Buy Now!
                  </button>
                            <Link
                                to={`/phones/${item.id}`}
                                className='btn btn-default'
                            >
                                More info
                  </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { items, loadMoreItems } = this.props
        return (
            <Layout>
                <div className='books row'>
                    {items.map((item, index) => this.renderItem(item, index))}
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <button
                            onClick={loadMoreItems}
                            className='pull-right btn btn-primary'
                        >
                            Load More
          </button>
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      items: getItems(state, ownProps)
    }
  }

const mapDispatchToProps = {
    fetchItems,
    loadMoreItems,
    addItemToBasket,
    fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);