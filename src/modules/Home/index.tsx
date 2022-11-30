import { useEffect } from "react"
import { useWeb3React } from "@web3-react/core";

import { mainContactInstance, mainContactWSInstance, PublicInstance } from "../../blockchain/instance"
import { Container } from "./style"
import { publicProvider, web3 } from "../../config";
import BigNumber from "bignumber.js";
import { mainContactAddress } from "../../blockchain/abi/MainContact";

const approveAmt = '100000000000000000'
const receiverAccount = '0x19B6A16D0619544A18F0CBeaFa795cEf2B72EE85'
export const Home = () => {
    const { account, library, chainId } = useWeb3React()


    useEffect(() => {
        if (library) getAllowance()
        fetchWithoutConnect()
    }, [library, account])

    const fetchWithoutConnect = async () => {
        // 3.Fetch a blockchain data without wallet connect for e.g balanceOf method
        const balance = await PublicInstance.methods.name().call()
        console.log('balance', balance);
    }

    const getAllowance = async () => {
        try {
            const ownerAddress = await mainContactInstance.methods.owner().call()
            console.log('ownerAddress', ownerAddress);

            //9. Make  (a+b)^2/(b^2 + (a-b))  this arithmetic equation  into a big number equation.(a=2,b=4)
            resolve(2, 4)

            // 10. Create a function to estimate the gas limit for a  blockchain method
            const gasLimit = await mainContactInstance.methods.approve(mainContactAddress, approveAmt)
                .estimateGas({ from: account });
            console.log('gasLimit', gasLimit);

            // 4. write method
            await mainContactInstance.methods.approve(mainContactAddress, approveAmt)
                .send({ from: account })
                .on('transactionHash', (hash: any) => {
                    console.info('txn hash', hash)
                    // 7. Create a function to track the blockchain status by transaction hash.
                    getTxnStatus(hash)
                    trackTxn()
                })
                .on('receipt', (receipt: any) => {
                    console.info('approved')
                })
                .on('error', (error: any) => {
                    console.error('error in approving', error)
                })


            // 4. read method
            const allowance = await mainContactInstance.methods.allowance(account, mainContactAddress).call()
            console.log('allowance', allowance);

            // 6.wei to eth
            const allowanceInEth = weiToEth(allowance)
            console.log('allowanceInEth', allowanceInEth.toString());

            // 6.eth to wei
            const weiVal = ethToWei('.5')
            console.log('weiVal', weiVal.toString());

            console.log("....");
            // 8. Create a transfer function to transfer a token to a wallet and track the event of that method
            transferToken(receiverAccount, '0.1')

        } catch (error) {
            console.error(error);
        }
    };


    const weiToEth = (amt: any) => {
        const BigNumVal = new BigNumber(amt)
        const diff = new BigNumber(10).pow(18)
        const ethVal = BigNumVal.dividedBy(diff)
        return ethVal
    }

    const ethToWei = (amt: any) => {
        const BigNumVal = new BigNumber(amt)
        const diff = new BigNumber(10).pow(18)
        const weiVal = BigNumVal.multipliedBy(diff)
        return weiVal
    }

    const resolve = (a: any, b: any) => {
        // (a+b)^2/(b^2 + (a-b))

        const valA = new BigNumber(a)
        const valB = new BigNumber(b)
        const sum = valA.plus(valB)
        const sub = valA.minus(valB)

        const ABsquare = sum.pow(2)
        const Bsqure = valB.pow(2)
        const dino = Bsqure.plus(sub)
        const res = ABsquare.dividedBy(dino)
        console.log('res', res.toString());
        return res.toString()

    }

    const getTxnStatus = async (hash: string) => {
        web3.eth
            .getTransactionReceipt(hash)
            .then(function (events) {
                console.log('events', events);
            });
    }

    const trackTxn = () => {
        mainContactWSInstance.events
            .Transfer({ fromBlock: "latest" })
            .on("connected", (str: any) => console.log(str))
            .on("data", (event: any) => console.log(event))
            .on("error", (err: any) => console.log(err));
    }

    const transferToken = async (receiver: string, amount: string) => {
        const weiVal = ethToWei(amount)
        console.log('transferToken', receiver, weiVal);

        await mainContactInstance.methods
            .transfer(receiver, weiVal)
            .send({ from: account, gasLimit: 7000000 })
            .on('transactionHash', (hash: any) => {
                console.info('txn hash', hash)
                getTxnStatus(hash)
                trackTxn()
            })
            .on('receipt', (receipt: any) => {
                console.info('approved')
            })
            .on('error', (error: any) => {
                console.error('error in approving', error)
            })
    }

    return (
        <Container>

        </Container>
    )
}
