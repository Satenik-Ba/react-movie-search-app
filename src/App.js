import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./components/Main/MainPage";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <MainPage />
      </header>
    </div>
  );
}

export default App;
