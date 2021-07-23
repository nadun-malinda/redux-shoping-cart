import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'
import axios from '../axios'

export const fetchCartData = () => {
    return (dispatch) => {
        axios.get('/cart.json')
            .then(res => {
                console.log('res: ', res)
                dispatch(cartActions.replaceCart({
                    items: res.data.items || [],
                    totalQuantity: res.data.totalQuantity
                }))
            })
            .catch(err => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!'
                }))
            })
    }
}

export const sendCartData = (cart) => {
    return (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        axios.put('/cart.json', { items: cart.items, totalQuantity: cart.totalQuantity })
            .then(res => {
                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!'
                }))
            })
            .catch(err => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!'
                }))
            })
    }
}