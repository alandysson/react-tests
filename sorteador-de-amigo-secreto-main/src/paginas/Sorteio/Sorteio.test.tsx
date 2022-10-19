import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../../state/hook/useListaParticipantes";
import { useResultadoSorteio } from "../../state/hook/useResoltadoSorteio";
import { Sorteio } from "./Sorteio";

jest.mock('../../state/hook/useListaParticipantes', () => {
   return {
      useListaParticipantes: jest.fn()
   }
})

jest.mock('../../state/hook/useResoltadoSorteio', () => {
   return {
      useResultadoSorteio: jest.fn()
   }
})

describe('Na pagina do sorteio', () => {
   const participantes = ['Alan', 'Rolim', 'Matias']
   const resultado = new Map([
      ['Alan', 'Rolim'],
      ['Matias', 'Alan'],
      ['Rolim', 'Matias']
   ])
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
      (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
   })
   it('todos os participantes podem exibir o seu amigo secreto', () => {
      render(<RecoilRoot>
         <Sorteio />
      </RecoilRoot>)
      const opcoes = screen.queryAllByRole('option')
      expect(opcoes).toHaveLength(participantes.length + 1)
   });
   it('o amigo secrete é exibido quando solicitado', () => {
      render(<RecoilRoot>
         <Sorteio />
      </RecoilRoot>)
      const select = screen.getByPlaceholderText('Selecione o seu nome')
      fireEvent.change(select, {
         target: {
            value: participantes[0]
         }
      })

      const botao = screen.getByRole('button')
      fireEvent.click(botao)

      const amigoSecreto = screen.getByRole('alert')
      expect(amigoSecreto).toBeInTheDocument()
   });
});