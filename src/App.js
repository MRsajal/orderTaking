import { useState } from "react";

const food = [
  {
    name: "Pizza",
    image: "./download (5).jpg",
    available: 10,
  },
  {
    name: "Burger",
    image: "./download (4).jpg",
    available: 6,
  },
  {
    name: "Fries",
    image: "./download (6).jpg",
    available: 8,
  },
];

export default function App() {
  const [showText, setShowText] = useState(false);
  const [order, setOrder] = useState(
    food.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  );
  const [orderSummary, setOrderSummary] = useState([]);
  function updateOrder(name, amount) {
    if (!showText) {
      setOrder((prev) => ({ ...prev, [name]: amount }));
    }
  }
  function handleOrder() {
    const summary = Object.entries(order)
      .filter(([_, amount]) => amount > 0)
      .map(([name, amount]) => ({ name, amount }));
    setOrderSummary(summary);
    setShowText(!showText);
  }
  return (
    <div className="main-cls">
      <div className="inner-cls">
        <FoodItem
          order={order}
          updateOrder={updateOrder}
          handleOrder={handleOrder}
          showText={showText}
        />
        <button onClick={handleOrder} className="order-btn">
          {!showText ? "Order" : "Close"}
        </button>
      </div>
      <div className="order-items">
        <h1>{showText ? "Ordered Items" : ""}</h1>
        {showText &&
          orderSummary.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>Amount: {item.amount}</p>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

function FoodItem({ order, updateOrder, handleOrder, showText }) {
  return (
    <div className="food-list">
      <ul>
        {food.map((item) => (
          <Item
            item={item}
            key={item.name}
            amount={order[item.name]}
            updateOrder={updateOrder}
            handleOrder={handleOrder}
            showText={showText}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, amount, updateOrder, showText }) {
  function handleIncreaseAmount() {
    if (!showText && item.available > 0) {
      updateOrder(item.name, amount + 1);
      item.available = item.available - 1;
    }
  }
  function handleDecreaseAmount() {
    if (!showText && amount - 1 >= 0) {
      updateOrder(item.name, amount - 1);
      item.available = item.available + 1;
    }
  }
  function handleInputChange(e) {
    let value = parseInt(e.target.value, 10);
    if (!showText && !isNaN(value) && value >= 0 && value <= item.available) {
      updateOrder(item.name, value);
    }
  }
  return (
    <li>
      <div className="item-img">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-text">
        <h3>{item.name}</h3>
        <p>{item.available}</p>
        <div>
          <button onClick={handleDecreaseAmount} disabled={showText}>
            -
          </button>
          <input
            style={{ width: "50px" }}
            value={amount}
            type="number"
            onChange={handleInputChange}
            disabled={showText}
          />
          <button onClick={handleIncreaseAmount} disabled={showText}>
            +
          </button>
        </div>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <div className="footer">
      <h3>Hope you are enjoying our foods</h3>
    </div>
  );
}

function SelectTable() {
  return (
    <div>
      <select>
        <option>Table: 1</option>
        <option>Table: 2</option>
        <option>Table: 3</option>
        <option>Table: 4</option>
      </select>
    </div>
  );
}
