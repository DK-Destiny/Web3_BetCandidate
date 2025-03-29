import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0xbf1828b7006b84fde5fafcb392b2c0fda94c0214";

export async function doLogin(){

    if(!window.ethereum) throw new Error("MetaMask not instaled!");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("MetaMask not authorized");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];

}

function getContract(){
    if(!window.ethereum) throw new Error("MataMask not installed");

    const from = localStorage.getItem("wallet");
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function getDispute(){
        const contract = getContract();
        return contract.methods.dispute().call();
}

export async function placeBet(candidate, amountInEth){
    const contract = getContract();
    return contract.methods.bet(candidate).send({
        value: Web3.utils.toWei(amountInEth, "ether"),
        gas: 115690,
        gasPrice: "46081790015"
    });
}

export async function finishDispute(winner) {
    const contract = getContract();
    return contract.methods.finish().send();
}

export async function claimPrize() {
    const contract = getContract();
    return contract.methods.claim().send();
}