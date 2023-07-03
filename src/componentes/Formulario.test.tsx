import { render, screen, fireEvent, act } from "@testing-library/react";

import React from "react";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

describe("Formulario", () => {
  test("Se o input estiver vazio, não posso adicionar novos participantes", () => {
    render (
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");
    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
  });

  test("Se o input não estiver vazio, posso adicionar novos participantes", () => {
    render (
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Ana Catarina" } });

    fireEvent.click(botao)

    expect(input).toHaveFocus()
    expect(input).toHaveValue('')
    // expect(botao).not.toBeDisabled();
});


test("a mensagem de erro deve sumir após 2 times", () => {
    render (
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Ana Catarina" } })

    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: "Ana Catarina" } })

    fireEvent.click(botao)

    let mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    
     mensagemDeErro = screen.getByRole("alert");  
  });

  test("nomes duplicados não podem ser adicionados na lista", () => {
    render (
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Ana Catarina" } })

    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: "Ana Catarina" } })

    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    

  });

  test("a mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers()
    render (
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Ana Catarina" } })

    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: "Ana Catarina" } })

    fireEvent.click(botao)

    let mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

     
    act(() => {
        jest.runAllTimers()
    });


    mensagemDeErro = screen.queryByRole("alert");  

    expect(mensagemDeErro).toBeNull()
    
  });
});

