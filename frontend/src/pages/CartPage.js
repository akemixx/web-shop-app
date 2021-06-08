import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export default function CartPage(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    return (
        <div>
            <h1>Cart Page</h1>
            <p>ADD TO CART: ProductId: {productId} Qty: {quantity}</p>
        </div>
    )
}
