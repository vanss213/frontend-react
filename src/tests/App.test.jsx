import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Testes do formulário de nota", () => {
  it("Renderiza os campos corretamente", () => {
    render(<App />);

    expect(screen.getByLabelText("CNPJ do Prestador")).toBeInTheDocument();
    expect(screen.getByLabelText("CNPJ do Tomador")).toBeInTheDocument();
    expect(screen.getByLabelText("Digite a descrição do serviço prestado")).toBeInTheDocument();
    expect(screen.getByLabelText("Digite o valor do serviço")).toBeInTheDocument();
  });
});


  