import React from 'react';
import { Switch, Route } from 'react-router';

import Items from '../components/items';
import SingleItem from '../components/singleItem';
import Basket from '../components/basket';

export default (
    <Switch>
        <Route path='/' component={Items} exact />
        <Route path='/categories/:id' component={Items}/>
        <Route path='/phones/:id' component={SingleItem} />
        <Route path='/basket' component={Basket} />
    </Switch>
)