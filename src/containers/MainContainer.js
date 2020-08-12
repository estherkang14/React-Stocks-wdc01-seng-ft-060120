import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

let URL = "http://localhost:3000/stocks/"

class MainContainer extends Component {

  constructor() {
    super()
    this.state = ({
      stocks: [],
      stockPortfolio: [],
      filteredStocks: [], 
      sortBy: "None"
    })
  }

  componentDidMount() {
    fetch(URL)
    .then(response => response.json())
    .then(stockData => this.setState({ stocks: stockData, filteredStocks: stockData }))
  }

  addStockToPortfolio = (e, stock) => {
    e.preventDefault()
    let newStockPortfolio = [...this.state.stockPortfolio, stock]

    this.setState({
      stockPortfolio: newStockPortfolio
    })
  }

  sellStock = (e, sellingStock) => {
    e.preventDefault()
    let stockPortfolio = [...this.state.stockPortfolio]
    this.setState({
      stockPortfolio: stockPortfolio.filter(stock => 
        {if (stock.id !== sellingStock.id) {
          return stock 
        } })
    })
  }

  filterStocks = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    let filteredStocks
    let allStocks = [...this.state.stocks]
    if (e.target.value === "All") {
      this.setState({ filteredStocks: allStocks})
    } else {
      filteredStocks = this.state.stocks.filter(stock =>
        {if (e.target.value === stock.type) {return stock} })

      this.setState({
        filteredStocks
      })
    }
  }

  sortStocks = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    let filteredStocks = [...this.state.stocks]
    if (e.target.value === "None") {
      this.setState({ filteredStocks, sortBy: "None" })
    } else if (e.target.value === "Alphabetically") {
      this.setState({ filteredStocks: filteredStocks.sort( (stock1, stock2) => 
        stock1.name.localeCompare(stock2.name)), sortBy: "Alphabetically"})
    } else if (e.target.value === "Price") {
      this.setState({ filteredStocks: filteredStocks.sort( (stock1, stock2) =>
        stock1.price - stock2.price), sortBy: "Price"})
    } 
  }

  render() {
    return (
      <div>
        <SearchBar filterStocks={this.filterStocks}
        sortStocks={this.sortStocks}
        sortBy={this.state.sortBy}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.filteredStocks}
              addStockToPortfolio={this.addStockToPortfolio}
              stockPortfolio={this.state.stockPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stockPortfolio={this.state.stockPortfolio} 
              sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
