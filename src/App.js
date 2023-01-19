import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dl, setDl] = useState(0);
  const onChange = (event) => {
    setDl(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (dl === "") {
      return;
    }
  };
  useEffect(() => {
    fetch("	https://api.coinpaprika.com/v1/tickers")
      .then((resonse) => resonse.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={dl}
          type="number"
          placeholder="Input USD"
        ></input>
      </form>
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}): {dl / coin.quotes.USD.price}{" "}
              {coin.symbol}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
