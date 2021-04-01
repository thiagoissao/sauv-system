import React, { useState, useEffect } from 'react'
import './App.less'
import Layout from './Layout'
import CriarDisciplina from './components/disciplina/CriarDisciplina'
import CriarTurma from './components/turma/CriarTurma'
import CriarSerie from './components/serie/CriarSerie'
import CriarFuncionarioOuCoordenador from './components/usuarioOuCoordenador/CriarFuncionarioOuCoordenador'
import ListarFuncionarioOuCoordenador from './components/usuarioOuCoordenador/ListarFuncionarioOuCoordenador'
import CriarAluno from './components/aluno/CriarAluno'
import ListarAluno from "./components/aluno/ListarAluno"
import { mockAlunoList } from "./models/aluno"
import CriarProfessor from "./components/professor/CriarProfessor"
import ListarProfessor from "./components/professor/ListarProfessor"
import { mockCoordenadorList, mockUsuarioList } from '../src/models/usuarioOuCoordenador'
import ListarTurmas from './components/turma/ListarTurmas'
import ListarDisciplinas from './components/disciplina/ListarDisciplinas'
import ListarSerie from './components/serie/ListarSerie'
import { UnorderedListOutlined, FormOutlined, LockOutlined, ControlOutlined, BookOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/login/Login';
import store from './redux/auth'
import ControleFrequencia from './components/turma/ControleFrequencia'
// import { allRoles } from './models/roles'
import ControleNotas from './components/nota/ControleNotas'
import TrancarTurma from './components/turma/TrancarTurma'
import TrancarAluno from './components/aluno/TrancarAluno'
import RelatorioTurma from './components/relatório/RelatorioTurma'
import ControleTrocarAlunoTurma from './components/aluno/ControleTrocarAlunoTurma'
import api from './services/api'

const allRoles = ['funcionario', 'coordenador', 'professor'];

const menuOptions = {
  visualizar: {
    icon: <UnorderedListOutlined />,
    label: 'Visualizar',
    enableFor: allRoles,
    opcoes: {
      funcionarios: {
        enableFor: allRoles,
        label: 'Funcionários',
        component: () =>
          <ListarFuncionarioOuCoordenador
            list={mockUsuarioList}
            tipo='Funcionários'
          />
      },
      coordenadores: {
        enableFor: allRoles,
        label: 'Coordenadores',
        component: () =>
          <ListarFuncionarioOuCoordenador
            list={mockCoordenadorList}
            tipo='Coordenadores'
          />
      },
      alunos: {
        enableFor: allRoles,
        label: 'Alunos',
        component: () =>
          <ListarAluno
            list={mockAlunoList}
            tipo="Alunos"
          />
      },
      professores: {
        enableFor: allRoles,
        label: 'Professores',
        component: () =>
          <ListarProfessor tipo="Professores" />
      },
      disciplinas: {
        enableFor: allRoles,
        label: 'Disciplinas',
        component: () => <ListarDisciplinas />
      },
      turmas: {
        enableFor: allRoles,
        label: 'Turmas',
        component: () => <ListarTurmas />
      },
      series: {
        enableFor: allRoles,
        label: 'Séries',
        component: () => <ListarSerie />
      },
    }
  },
  cadastrar: {
    enableFor: ['coordenador', 'funcionario'],
    icon: <FormOutlined />,
    label: 'Cadastrar',
    opcoes: {
      funcionarios: {
        label: 'Funcionários',
        enableFor: ['funcionario'],
        component: () =>
          <CriarFuncionarioOuCoordenador
            title='Cadastro de Funcionários'
          />
      },
      coordenadores: {
        label: 'Coordenadores',
        enableFor: ['funcionario'],
        component: () =>
          <CriarFuncionarioOuCoordenador
            title='Cadastro de Coordenadores(as)'
          />
      },
      alunos: {
        label: 'Alunos',
        enableFor: ['coordenador', 'funcionario'],
        component: () => <CriarAluno />
      },
      professores: {
        enableFor: ['coordenador', 'funcionario'],
        label: 'Professores',
        component: () => <CriarProfessor />
      },
      disciplinas: {
        label: 'Disciplinas',
        enableFor: ['funcionario'],
        component: () => <CriarDisciplina title='Cadastro de Disciplina' />
      },
      turmas: {
        label: 'Turmas',
        enableFor: ['funcionario'],
        component: () => <CriarTurma title='Cadastro de Turma' />
      },
      series: {
        label: 'Séries',
        enableFor: ['funcionario'],
        component: () => <CriarSerie title='Cadastro de Série' />
      },
    }
  },
  trancar: {
    enableFor: ['coordenador', 'funcionario'],
    icon: <LockOutlined />,
    label: 'Trancamentos',
    opcoes: {
      alunos: {
        label: 'Alunos',
        enableFor: ['funcionario', 'coordenador'],
        component: () => <TrancarAluno title='Trancamento de Aluno' />
      },
      turmas: {
        label: 'Turmas',
        enableFor: ['coordenador', 'funcionario'],
        component: () => <TrancarTurma title="Trancamento de Turma" />
      },
    }
  },
  relatorio: {
    enableFor: ['coordenador', 'funcionario', 'professor'],
    icon: <BookOutlined />,
    label: 'Relatórios',
    opcoes: {
      relatorioTurma: {
        enableFor: ['coordenador', 'funcionario', 'professor'],
        label: "Relatório de Turma",
        component: () => <RelatorioTurma title="Relatório de Turma" />
      },
    },
  },
  controle: {
    enableFor: allRoles,
    icon: <ControlOutlined />,
    label: 'Controles',
    opcoes: {
      trocarAlunoTurma: {
        label: 'Trocar Aluno-Turma',
        enableFor: ['coordenador'],
        component: () => <ControleTrocarAlunoTurma />
      },
      frequencia: {
        label: 'Frequência',
        enableFor: ['professor'],
        component: () => <ControleFrequencia />
      },
      notas: {
        enableFor: ['professor'],
        label: 'Notas',
        component: () => <ControleNotas />
      }
    }
  }
}

const App = () => {
  const [selectedKeys, setSelectedKeys] = useState('visualizar:usuarios')
  const { loggedIn } = store.getState()

  return (
    <>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/visualizar/usuarios" /> : <Redirect to="/login" />}
          </Route>
          {
            <Layout
              loggedIn={loggedIn}
              onClick={e => setSelectedKeys(e.key)}
              selectedKeys={selectedKeys}
              menuOptions={menuOptions}
            />
          }
          {
            !loggedIn && <Redirect to="/login" />
          }
        </Switch>
      </Router>
    </>
  );
}

export default App;
