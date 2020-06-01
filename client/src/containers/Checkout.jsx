import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import {toast} from 'react-toastify'

toast.configure()
const Checkout = (props) => {
    const userId=localStorage.getItem('user')
    const[orders, setOrders]=useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/orders`)
            .then(res => setOrders(res.data))
        }, [])
    const MyOrders = (e) => {
        for (let i = 0; i < orders.length; i++){
            if(orders[i].customer === userId){
                console.log(orders[i])
            }
        }
    }
    async function handleToken(token) {
        const response = await axios.post(
          "http://localhost:8000/checkout",
          { token, orders}
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
          toast("Success! Check email for details", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
      }

    return (
        <div>
            <h1>Your Order Summary:</h1>
            {orders.filter(u => u.customer === userId).map((order, i)=>{
                return(
                    <div className="col-sm-4" style={{display:'inline-block'}}>
                        <div className="card" key={order._id}>
                            <div className="card-body">
                                <h4 className="card-title">Order number: {Math.floor(Math.random() * 1000) - 1}</h4>
                                <p className="card-text">Total price: ${order.totalPrice}</p>

                                <ul className="list-group list-group-flush">
                                    {order.products.map((item)=>{
                                        return(                                         
                                                <li className="list-group-item">{item.addedName}</li>

                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <br>
                        </br>
                        <StripeCheckout
                            stripeKey="pk_test_RcWV1eZu8nWPZBSvxQ1e0bVz008sJQH9f2"
                            token={handleToken} 
                            amount={order.totalPrice *100}
                            name="Van-Goes meal"
                        />
                        <br></br>
                         <br></br>
            <button className="btn btn-warning"><Link to="/menu">Add More To Your Order</Link></button>
                    </div>

                )
            })}

        </div>
    )
}

export default Checkout

