import React, { useRef } from 'react'
import { useAdicionarParticipante } from './state/hooks/useAdicionarParticipante'
import { useMensagemDeErro } from './state/hooks/useMensagemDeErro'

export default function Formulario() {
    const [name, setName] = React.useState('')
    const adicionarNomeNaLista = useAdicionarParticipante()
    const mensagemDeErro = useMensagemDeErro()

    const inputRef = useRef<HTMLInputElement>(null)

    const disabled = React.useMemo(() => name.length === 0,[name])

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>)=> {
        evento.preventDefault()
        adicionarNomeNaLista(name)
        setName('')
       inputRef.current?.focus()
    }
    
  return (
    <form onSubmit={adicionarParticipante}>
        <input
            ref={inputRef}
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            type="text" 
            placeholder='Insira os nomes dos participantes'
        />
        <button 
            disabled={disabled} 
        >
            Adicionar
        </button>
        {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
      
    </form>
  )
}
