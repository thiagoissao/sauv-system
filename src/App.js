import React, { useState, useEffect } from 'react'
import './App.less'
import Layout from './Layout'
import CriarDisciplina from './components/disciplina/CriarDisciplina'
import CriarTurma from './components/turma/CriarTurma'
import CriarSerie from './components/serie/CriarSerie'
import CriarUsuarioOuCoordenador from './components/usuarioOuCoordenador/CriarUsuarioOuCoordenador'
import ListarUsuarioOuCoordenador from './components/usuarioOuCoordenador/ListarUsuarioOuCoordenador'
import CriarAluno from './components/aluno/CriarAluno'
import ListarAluno from "./components/aluno/ListarAluno"
import { mockAlunoList } from "../src/models/aluno"
import { mockCoordenadorList, mockUsuarioList } from '../src/models/usuarioOuCoordenador'
import ListarTurmas from './components/turma/ListarTurmas'
import ListarDisciplinas from './components/disciplina/ListarDisciplinas'
import ListarSerie from './components/serie/ListarSerie'
import { UnorderedListOutlined, FormOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/login/Login';

const menuOptions = {
  visualizar: {
    icon: <UnorderedListOutlined />,
    label: 'Visualizar',
    opcoes: {
      usuarios: {
        label: 'Usuários',
        component: () =>
          <ListarUsuarioOuCoordenador
            list={mockUsuarioList}
            tipo='Usuários'
          />
      },
      alunos: {
        label: 'Alunos',
        component: () =>
          <ListarAluno
            list={mockAlunoList}
            tipo="Alunos"
          />
      },
      professores: {
        label: 'Professores'
      },
      disciplinas: {
        label: 'Disciplinas',
        component: () => <ListarDisciplinas />
      },
      turmas: {
        label: 'Turmas',
        component: () => <ListarTurmas />
      },
      series: {
        label: 'Séries',
        component: () => <ListarSerie />
      },
      coordenadores: {
        label: 'Coordenadores',
        component: () =>
          <ListarUsuarioOuCoordenador
            list={mockCoordenadorList}
            tipo='Coordenadores'
          />
      },
    }
  },
  cadastrar: {
    icon: <FormOutlined />,
    label: 'Cadastrar',
    opcoes: {
      usuarios: {
        label: 'Usuários',
        component: () => <CriarUsuarioOuCoordenador />
      },
      alunos: {
        label: 'Alunos',
        component: () => <CriarAluno />
      },
      professores: {
        label: 'Professores',
      },
      disciplinas: {
        label: 'Disciplinas',
        component: () => <CriarDisciplina />
      },
      turmas: {
        label: 'Turmas',
        component: () => <CriarTurma />
      },
      series: {
        label: 'Séries',
        component: () => <CriarSerie />
      },
      coordenadores: {
        label: 'Coordenadores',
        component: () => <CriarUsuarioOuCoordenador tipo='Coordenador(a)' />
      },
    }
  },
}

const App = () => {
  const [loggedIn] = useState(!!localStorage.getItem("usuario"))
  const [selectedKeys, setSelectedKeys] = useState('visualizar:usuarios')

  return (
    <>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/visualizar/usuarios" /> : <Redirect to="/login" />}
          </Route>
          <Layout
            onClick={e => setSelectedKeys(e.key)}
            selectedKeys={selectedKeys}
            menuOptions={menuOptions}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
