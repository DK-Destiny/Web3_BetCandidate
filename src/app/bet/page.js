"use client"

import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDispute, placeBet, claimPrize } from "../services/Web3Service";
import Web3 from "web3";

export default function Bet() {

  const {push} = useRouter();

  const [message, setMessage] = useState();
  const [dispute, setDispute] = useState({
    candidate1: "Loanding...",
    candidate2: "Loanding...",
    image1: "/anonimo.webp",
    image2: "/anonimo.webp",
    total1: 0,
    total2: 0,
    winner: 0
  });

  useEffect(() => {
    if(!localStorage.getItem("wallet")) return push("/");
    setMessage("Obtendo dados da disputa...aguarde");
    getDispute()
      .then(dispute => {
        setDispute(dispute);
        setMessage("");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }, []);

  function processBet(candidate){
    setMessage("Conectando na carteira...aguarde...");
    const amount = prompt("Qauntidadae em POL para apostar:", "1");
    placeBet(candidate, amount)
      .then(() => {
        alert("Aposta recebida com sucesso, aguarde 1 minuto para ser registrada no sistema. ");
        setMessage("");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  function btnClaimClick(){
    setMessage("Conecting wallet...");
    claimPrize()
      .then(() => {
        alert("Prêmio coletado com sucesso, aguarde 1 minuto e verifique sua carteira. ");
        setMessage("");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  return(
    <>
      <Head>
        <title>BetCandidate / Bet</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="container px-4 py-5">
        <div className="row align-itens-center">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
            <p className="lead">Aposta on-chain nas eleições americanas.</p>
            {
              dispute.winner == 0
                ?<p className="lead">Você tem até o dia anterior a eleição pra fazer a sua aposta.</p>
                :<p className="lead">Disputa encerrada. Veja o vencedor abaixo e solicite seu prêmio.</p>
            }
        </div>
        <div className="row flex-lg-row-reverse align-itens-center g-1 py-5">
            <div className="col"></div>
            {
              dispute.winner == 0 || dispute.winner == 1
                ? <div className="col">
                    <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                      {dispute.candidate1}
                    </h3>
                    <img src={dispute.image1} className="d-block mx-auto img-fluid rounded" width={250}></img>
                    {
                        dispute.winner == 1
                        ?<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={btnClaimClick}>Pegar meu prêmio.</button>
                        :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => processBet(1)}>Apostar neste candidato</button>
                    }
                    <span className="badge text-bg-secondary d-block mx-auto" style={{width: 250}}>{Web3.utils.fromWei(dispute.total1, "ether")} POL Apostados</span>
                  </div>
                  :<></>
            }
            {
              dispute.winner == 0 || dispute.winner == 2
                ? <div className="col">
                    <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                      {dispute.candidate2}
                    </h3>
                    <img src={dispute.image2} className="d-block mx-auto img-fluid rounded" width={250}></img>
                    {
                        dispute.winner == 2
                        ?<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={btnClaimClick}>Pegar meu prêmio.</button>
                        :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => processBet(2)}>Apostar neste candidato</button>
                    }
                    <span className="badge text-bg-secondary d-block mx-auto" style={{width: 250}}>{Web3.utils.fromWei(dispute.total1, "ether")} POL Apostados</span>
                  </div>
                  :<></>
            }
             
        </div>
        <div className="row align-items-center">
            <p className="message">{message}</p>
        </div>
        <footer className="d-flex d-flex-wrap justify-content-between align-itens-center py-3 my-4 border-top">
          <p className="col-4 mb-0 text-body-secondary">
            &copy; 2024 BetCandidate / Powerd by Luis Sales
          </p>
          <ul className="nav col-4 justify-content-end">
          <li className="nav-iten"><a href="/" className="nav-link px-2 text-body-secudary">Home</a></li>
          <li className="nav-iten"><a href="/about" className="nav-link px-2 text-body-secudary">About</a></li>
          </ul>
        </footer>
      </div>
    </>
  );
}
