import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
        addItemToCart(state, action) {
            const newItem = action.payload
            const existingitem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
            state.changed = true
            if (!existingitem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    name: newItem.title,
                    totalPrice: newItem.price,
                    quantity: 1
                })
            } else {
                existingitem.quantity++
                existingitem.totalPrice += newItem.price
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload
            const existingitem = state.items.find(item => item.id === id)
            state.totalQuantity--
            state.changed = true
            if (existingitem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingitem.quantity--
                existingitem.totalPrice -= existingitem.price
            }
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice