import React, { useState } from 'react'
import './App.less'
import Layout from './Layout'

const menuOptions = {
  visualizar: {
    label: 'Visualizar',
    opcoes: {
      usuarios: {
        label: 'Usuários',
        component: () => <h1>Teste usuário</h1>
      },
      alunos: {
        label: 'Alunos',
        component: () => <h1>Teste Alunos</h1>
      },
      professores: {
        label: 'Professores'
      },
      disciplinas: {
        label: 'Disciplinas'
      },
      turmas: {
        label: 'Turmas'
      },
      series: {
        label: 'Séries'
      },
      coordenadores: {
        label: 'Coordenadores'
      },
    }
  },
  cadastrar: {
    label: 'Cadastrar',
    opcoes: {
      usuarios: {
        label: 'Usuários',
      },
      alunos: {
        label: 'Alunos'
      },
      professores: {
        label: 'Professores'
      },
      disciplinas: {
        label: 'Disciplinas'
      },
      turmas: {
        label: 'Turmas'
      },
      series: {
        label: 'Séries'
      },
      coordenadores: {
        label: 'Coordenadores'
      },
    }
  },
  alterar: {
    label: 'Alterar',
    opcoes: {
      usuarios: {
        label: 'Usuários',
      },
      alunos: {
        label: 'Alunos'
      },
      professores: {
        label: 'Professores'
      },
      disciplinas: {
        label: 'Disciplinas'
      },
      turmas: {
        label: 'Turmas'
      },
      series: {
        label: 'Séries'
      },
      coordenadores: {
        label: 'Coordenadores'
      },
    }
  },
}

const App = () => {

  const [selectedKeys, setSelectedKeys] = useState('visualizar:usuarios')

  return (
    <Layout
      onClick={e => setSelectedKeys(e.key)}
      selectedKeys={selectedKeys}
      menuOptions={menuOptions}
    />
  );
}

export default App;
