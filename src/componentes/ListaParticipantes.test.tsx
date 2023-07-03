import { render, screen} from "@testing-library/react";
import ListaParticipantes from '../componentes/ListaParticipantes'
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "./state/hooks/useListaDeParticipantes";

jest.mock('./state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})


describe("uma lista vazia de participantes", () => {
    beforeEach(()=> {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test("se a lista estiver vazia", () => {
      render (
          <RecoilRoot>
             <ListaParticipantes/>
          </RecoilRoot>
      );
      const itens = screen.queryAllByRole('listitem');

      expect(itens).toHaveLength(0);
    });
  });
  
  
  describe("uma lista preenchida", () => {
        const participantes = ['Ana', 'Catarina']
          beforeEach(()=> {
              (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
          })
          test("se a lista estiver preenchida", () => {

        render (
            <RecoilRoot>
               <ListaParticipantes/>
            </RecoilRoot>
        )
        const itens = screen.queryAllByRole('listitem');
  
        expect(itens).toHaveLength(participantes.length);
    });
      });