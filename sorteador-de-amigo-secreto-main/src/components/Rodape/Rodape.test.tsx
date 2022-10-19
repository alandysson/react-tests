import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../../state/hook/useListaParticipantes"
import { Rodape } from "./Rodape";

jest.mock('../../state/hook/useListaParticipantes', () => {
   return {
      useListaParticipantes: jest.fn()
   }
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()

jest.mock('../../state/hook/useSorteador', () => {
   return {
      useSorteador: () => mockSorteio
   }
})

jest.mock('react-router-dom', () => {
   return {
      useNavigate: () => mockNavegacao
   }
})

describe('Quando não existem participantes suficiente', () => {
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue([])
   })
   it('o botao deve esta desabilitado', () => {
      render(<RecoilRoot><Rodape /></RecoilRoot>)
      const botao = screen.getByRole('button')
      expect(botao).toBeDisabled();
   });
});

describe('quando existem participantes suficiente', () => {
   const participantes = ['alan', 'joao', 'pedro']
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
   })
   it('a brincadeira pode ser inicializada', () => {
      render(<RecoilRoot><Rodape /></RecoilRoot>)
      const botao = screen.getByRole('button')
      expect(botao).not.toBeDisabled();
   });
   it('a brincadeira foi iniciada', () => {
      render(<RecoilRoot><Rodape /></RecoilRoot>)
      const botao = screen.getByRole('button')
      fireEvent.click(botao)
      expect(mockNavegacao).toHaveBeenCalledTimes(1);
      expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
      expect(mockSorteio).toHaveBeenCalledTimes(1);
   });
});