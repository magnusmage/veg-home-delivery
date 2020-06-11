import * as Auth from './auth';
import * as Veggies from './veggies';
import * as Orders from './orders';

export const ActionCreators = Object.assign({},
    Auth,
    Veggies,
    Orders
);