import { render, screen} from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Rodape from ".";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

describe("onde não existem participantes suficientes", () => {
    beforeEach(()=> {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test("a brincadeira não pode ser iniciada", () => {
      render (
          <RecoilRoot>
             <Rodape/>
          </RecoilRoot>
      );
      const botao = screen.queryByRole('button');

      expect(botao).toBeDisabled()
    });
  });
  
  describe("onde existem participantes suficientes", () => {
    beforeEach(()=> {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Josefina', 'Carina'])
    })

    test("a brincadeira pode ser iniciada", () => {
      render (
          <RecoilRoot>
             <Rodape/>
          </RecoilRoot>
      );
      const botao = screen.queryByRole('button');

      expect(botao).not.toBeDisabled()
    });
  });