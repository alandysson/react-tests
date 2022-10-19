import React from "react";
import { render, screen } from "@testing-library/react";
import { ListaParticipantes } from "./ListaParticipantes";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";

jest.mock('../state/hook/useListaParticipantes', () => {
   return {
      useListaParticipantes: jest.fn()
   }
})


describe('uma lista vazia de participantes', () => {
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue([])
   })
   it('deve ser renderizada sem elementos', () => {
      render(<RecoilRoot>
         <ListaParticipantes />
      </RecoilRoot>)
      const itens = screen.queryAllByRole('listitem')
      expect(itens).toHaveLength(0)
   });
});

describe('uma lista com participantes', () => {
   const participantes = ['Alan', 'Rolim', 'Jose']
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
   })
   it('deve ser renderizado com elementos', () => {
      render(<RecoilRoot>
         <ListaParticipantes />
      </RecoilRoot>)
      const itens = screen.queryAllByRole('listitem')
      expect(itens).toHaveLength(participantes.length)
   });
});