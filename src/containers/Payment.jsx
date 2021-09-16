import React, { useContext }from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = ({history}) => {
  const { state, addNewOrder } = useContext (AppContext)
  const { cart, buyer } = state

  const paypalOptions = {
    clientId:'AZzbue8VsA4T7C507X5FNtYJarEa6bCAKJNrlxcaO2E47Wr2YrUlBer9RlKqB4bMZ5jgdj078cQORmPz',
    ident:'capture',
    currency:'USD',
  }

  const buttonsStyles = {
      layout: 'vertical',
      shape: 'rect'
  }

  const handlePaymentSuccess = (data) => {
    console.log(data)
    if (data.status === 'COMPLETED'){
      const nowOrder = {
        buyer,
        product: cart,
        payment: data,
      }
      addNewOrder(newOrder);
      history.push('/checkout/success')
    }
  }  
  const handleSumTotal = () => {
    const reducer = (acumulator, currentValue) =>
      acumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }; 
  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>resumen del pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonsStyles={buttonsStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('start payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={() => console.log('payment error')}
            onPaymentCancel={() => console.log('payment cancel')}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Payment;
