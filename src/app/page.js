"use client"

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doLogin } from "./services/Web3Service";

export default function Home() {

  const { push } = useRouter();

  const [message, setMessage] = useState();

  function btnLoginClick(){
    setMessage("Conecting wallet...");
    doLogin()
      .then(account => push("/bet"))
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  return(
    <>
      <Head>
        <title>BetCandidate / Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-itens-center g-5 py-5">
          <div className="col-6">
            <img src="/trumpkamala.webp" className="d-block mx-lg-auto img-fluid" width="700" heigt="500" />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
            <p className="lead">Aposta on-chain nas eleições americanas.</p>
            <p className="lead">Autentique-se com sua carteira e deixe sua aposta.</p>
            <div className="d-flex justify-content-start">
              <button type="button" className="btn btn-primary btn-lg px-4" onClick={btnLoginClick}>
                <img src="/metamask.svg" width={64} className="me-3" />
                Conect Wallet
              </button>
            </div>
            <p className="message">{message}</p>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-itens-center py-3 my-4 border-top">
          <p className="col-4 mb-0 text-body-secundary">
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
