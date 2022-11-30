import { publicProvider, web3, web3Ws } from '../config'
import { mainContactAddress, mainContactABI } from './abi/MainContact'


// 2.Create a contract instance.
export const mainContactInstance: any = new web3.eth.Contract(mainContactABI, mainContactAddress)
export const mainContactWSInstance: any = new web3Ws.eth.Contract(mainContactABI, mainContactAddress)

export const PublicInstance = new publicProvider.eth.Contract(mainContactABI, mainContactAddress)

