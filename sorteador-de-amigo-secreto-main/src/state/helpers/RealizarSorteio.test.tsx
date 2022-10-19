import React from "react"
import { realizarSorteio } from "./RealizarSorteio";

describe('dado um seorteio de amigo secreto', () => {
   it('cada participante nao sorteie o proprio nome', () => {
      const participantes = [
         'Alan',
         'Rolim',
         'Julio',
         'Matias',
         'Mane'
      ]
      const sorteio = realizarSorteio(participantes)
      participantes.forEach(participante => {
         const amigoSecreto = sorteio.get(participante)
         expect(amigoSecreto).not.toEqual(participante)
      })
   });
});