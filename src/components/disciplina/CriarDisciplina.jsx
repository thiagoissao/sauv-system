import React from 'react'
import './CriarDisciplina.css'

export default () =>
  <div>
    <div className='CriarDisciplina'>
      <label htmlFor="nomeDisciplina">Nome da disciplina</label>
      <input type="text" id="nomeDisciplina" className="imputDisciplina" />
      <label htmlFor="cargaHoraria">Carga horária da disciplina</label>
      <input type="text" id="cargaHoraria" className="imputDisciplina" />
    </div>
    <div className='botoesDisciplina'>
      <div className='botaoDisciplina'>
        <button onClick={e => alert('Ação cancelada!')}>Cancelar</button>
      </div>
      <div className='botaoDisciplina'>
        <button onClick={e => alert('Disciplina cadastrada com sucesso!')}>Cadastrar</button>
      </div>
    </div>
  </div>