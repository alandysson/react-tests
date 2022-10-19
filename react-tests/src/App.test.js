import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import App, { calcularNovoSaldo } from "./app";

describe('Componente principal', () => {
   describe('Quando eu abro o app', () => {
      it('Mostrar o nome do Banco', () => {
         render(<App />);
         expect(screen.getAllByText('ByteBank'));
      })

      it('Mostrar saldo', () => {
         render(<App />);
         expect(screen.getAllByText('Saldo:'));
      })

      it('Mostrar nome do Botão', () => {
         render(<App />);
         expect(screen.getAllByText('Realizar operação'));
      })
   })
   describe('Quando realizo uma transação', () => {
      it('quando é um saque, o valor diminui', () => {
         const valores = {
            transacao: 'saque',
            valor: 50
         }
         const novoSaldo = calcularNovoSaldo(valores, 150)
         expect(novoSaldo).toBe(100)
      })
      it('quando é deposito, o valor aumenta', () => {
         const valores = {
            transacao: 'deposito',
            valor: 50
         }
         const novoSaldo = calcularNovoSaldo(valores, 150)
         expect(novoSaldo).toBe(200)
      })
      it('quando o saldo é insuficiente', () => {
         const valores = {
            transacao: 'saque',
            valor: 150
         }
         const novoSaldo = calcularNovoSaldo(valores, 150)
         expect(novoSaldo).toBeGreaterThanOrEqual(0)
      })

      it('que é um saque, a transacao deve ser realizada', () => {
         render(<App />)

         const saldo = screen.getByText('R$ 1000')
         const transacao = screen.getByLabelText('Saque')
         const valor = screen.getByTestId('valor')
         const botaoTransacao = screen.getByText('Realizar operação')
         expect(saldo.textContent).toBe('R$ 1000');

         fireEvent.click(transacao, { target: { value: 'saque' } })
         fireEvent.change(valor, { target: { value: 1000 } })
         fireEvent.click(botaoTransacao)

         expect(saldo.textContent).toBe('R$ 0');
      });
   })
})
