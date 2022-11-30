import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

const supportedChainId = 5;
export const PROVIDER_URL = "https://goerli.infura.io/v3/2784856cacf143abadd74d0080f0b91e";
export const PROVIDER_URL_WS = "wss://goerli.infura.io/ws/v3/2784856cacf143abadd74d0080f0b91e";

// 1.Create a provider in web3.
export const web3 = new Web3(Web3.givenProvider || PROVIDER_URL);
export const web3Ws = new Web3(Web3.givenProvider || PROVIDER_URL_WS);
export const publicProvider = new Web3(PROVIDER_URL)

export const injected = new InjectedConnector({
  supportedChainIds: [supportedChainId],
});
