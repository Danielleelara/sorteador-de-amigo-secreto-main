import React from 'react'
import { useListaDeParticipantes } from '../state/hooks/useListaDeParticipantes';

export default function ListaParticipantes() {

    const participantes: string[] = useListaDeParticipantes();

  return (
    <ul >
        {participantes.map((item)=> 
        <li key={item}>{item}</li> 
        )}
    </ul>
  )
}
