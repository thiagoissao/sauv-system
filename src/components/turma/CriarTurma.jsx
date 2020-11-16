import React from 'react'
import './CriarTurma.css'

export default () =>
  <div>
    <div className='CriarTurma'>
      <label htmlFor="serieTurma">Série que a turma irá pertencer</label>
      <input type="text" id="serieTurma" className="imputTurma" />
    </div>
    <div className='botoesTurma'>
      <div className='botaoTurma'>
        <button onClick={e => alert('Ação cancelada!')}>Cancelar</button>
      </div>
      <div className='botaoTurma'>
        <button onClick={e => alert('Turma cadastrada com sucesso!')}>Cadastrar</button>
      </div>
    </div>
  </div>