import backgroundImage from "./assets/background.jpg";
import "./App.css";
import Header from "./Header";
import ExchangeRateContainer from "./ExchangeRateContainer";
function App() {
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        zIndex: 1,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay"></div>

      <Header />
      <ExchangeRateContainer />
    </div>
  );
}

export default App;
