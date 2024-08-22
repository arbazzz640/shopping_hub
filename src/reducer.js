// 1)  state parameter me jo hum initial state me likhte hain woh sb yaha state parameter me hota hain 

// 2)  action parameter me woh sab hota hain jo hum dispatch function ke sath likh ker send karte hain 
const reducer = (state, action) => {
    // console.log(state);
    // console.log(action);
    switch (action.type) {
        case 'API_DATA':
            return {
                ...state,
                products: action.payload.myproducts,
                isloading: action.payload.loading
            };

        case 'SET_QUANTITY':
            return {
                ...state,
                itemQuantities: {
                    ...state.itemQuantities,
                    [action.itemId]: action.quantity,
                },
            };

        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };

        case 'SET_CART_CONTENT':
            return {
                ...state,
                cart: action.payload,
            };

        // case 'REMOVE_CART_CONTENT' :
        //    const id =  state.cart.filter(prodId => prodId.id !== action.payload.id)
        //    console.log(id);
        //     return {...state , state : id}

        case 'REMOVE_CART_CONTENT':
            const newCart = state.cart.filter(product => product.id !== action.payload);
            return {
                ...state,
                cart: newCart,
            };

        case 'CALCULATE_TOTAL_PRICE':
            const updatedCart = state.cart.map(item => {
                const quantity = state.itemQuantities[item.id] || 1;
                return { ...item, selectedQuantity: quantity };
            });
            console.log(updatedCart);

            const newTotalPrice = updatedCart.reduce((total, item) => {
                return total + item.price * item.selectedQuantity;
            }, 0);
            console.log(newTotalPrice);

            return {
                ...state,
                cart: updatedCart,
                totalPrice: newTotalPrice,
            };

            case 'SORT_BY_PRICE' :
                return { ...state , sort : action.payload}

            case 'FAST_DELIVERY' :
                return {...state , fastDelivery : !state.fastDelivery}

            case 'OUT_OF_STOCK' :
                return {...state , byStock : !state.byStock}
            
            case 'SORT_BY_RANGE' :
                return {...state , priceRange : action.payload}

            case 'SORT_BY_SEARCH' :
                return {...state , searchQuery : action.payload}

            case 'REMOVE_FILTER' :
                return {
                    sort : '', 
                    fastDelivery : false,
                    byStock : false,
                    priceRange : '',
                    searchQuery : ''
                 }
            
            case 'SET_LOGIN_STATE' :
                return {...state , isLoggedIn : action.payload}

        default:
            return state
    }
}
export default reducer

