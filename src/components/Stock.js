import React from 'react'

const Stock = (props) => (
  <div>

    <div className="card" onClick={ !props.stockPortfolio.includes(props.stock) ? 
      ((e) => props.addStockToPortfolio(e, props.stock)) 
      : ((e) => props.sellStock(e, props.stock)) }>
      <div className="card-body">
        <h5 className="card-title">{
            props.stock.name
          }</h5>
        <p className="card-text">{
            //ticker: stock price
            props.stock.ticker}: {props.stock.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
