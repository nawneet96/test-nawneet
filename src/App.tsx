import { useWeb3React } from "@web3-react/core";
import { injected } from "./config";
import "./App.css";
import { Home } from "./modules/Home";
import { Button, Header } from "./style";

function App() {
  const { activate, active, account, deactivate } = useWeb3React();

  const connector = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    deactivate();
  };

  return (
    <>
      <div className="navbar">
        <Header>
          {active ? <div>Account : {account}</div> : ''}
          {!active ? (
            <Button onClick={() => connector()}>
              Connect
            </Button>
          ) : (
            <Button onClick={() => disconnect()}>
              Disconnect
            </Button>
          )}
        </Header>
      </div>
      <Home />
    </>
  );
}

export default App;
