import React, { useState } from "react";
import axios from "axios";          // ✅ IMPORTAÇÃO CORRETA
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  const [prestador, setPrestador] = useState("");
  const [tomador, setTomador] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [pdfLink, setPdfLink] = useState("");  // ✅ STATE CORRETO

  const emitirNota = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://app-notas-fiscais-backend-a31afc175408.herokuapp.com/api/emitir-nfse", {
        cnpj_prestador: prestador,
        cnpj_tomador: tomador,
        descricao,
        valor
      });

      alert("Nota emitida com sucesso!");

      // ✅ SALVA O LINK DO PDF
      setPdfLink("https://app-notas-fiscais-backend-a31afc175408.herokuapp.com" + res.data.dados.caminho_pdf);

    } catch (error) {
      console.error("Erro ao emitir:", error);
      alert("Erro ao emitir nota.");
    }
  };

  const enviarWhatsApp = () => {
    const texto = encodeURIComponent(`Segue a nota fiscal:\n${pdfLink}`);
    window.open(`https://wa.me/?text=${texto}`, "_blank");
  };

  return (
    <div className="background">
      <div className="card">

        <div className="left-area">
          <img src={logo} alt="Logo" className="main-img" />
        </div>

        <div className="right-area">

          <h1 className="title">Sistema de Notas – Oliveira Transportes</h1>

          <form onSubmit={emitirNota} className="form">

            <input
              type="text"
              placeholder="CNPJ Prestador"
              value={prestador}
              onChange={(e) => setPrestador(e.target.value)}
            />

            <input
              type="text"
              placeholder="CNPJ Tomador"
              value={tomador}
              onChange={(e) => setTomador(e.target.value)}
            />

            <textarea
              placeholder="Descrição do Serviço"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>

            <input
              type="text"
              placeholder="Valor (R$)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />

            <button type="submit" className="btn-emitir">
              Emitir Nota
            </button>
          </form>

          <div className="buttons-area">

            <a
              href={pdfLink}
              className="btn-pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Baixar PDF
            </a>

            <button className="btn-whats" onClick={enviarWhatsApp}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
                alt="WhatsApp"
              />
              WhatsApp
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
