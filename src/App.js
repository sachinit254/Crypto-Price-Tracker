import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await axios(url);
        const data = res.data;
        setCoins(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            marketCapRank={coin.market_cap_rank}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
};

export default App;
