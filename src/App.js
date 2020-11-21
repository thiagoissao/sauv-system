import React, { useState } from 'react'
import './App.less'
import Layout from './Layout'
import CriarDisciplina from './components/disciplina/CriarDisciplina'
import CriarTurma from './components/turma/CriarTurma'
import CriarSerie from './components/serie/CriarSerie'
import CriarFuncionarioOuCoordenador from './components/usuarioOuCoordenador/CriarFuncionarioOuCoordenador'
import ListarFuncionarioOuCoordenador from './components/usuarioOuCoordenador/ListarFuncionarioOuCoordenador'
import CriarAluno from './components/aluno/CriarAluno'
import ListarAluno from "./components/aluno/ListarAluno"
import { mockAlunoList } from "../src/models/aluno"
import { mockCoordenadorList, mockUsuarioList } from '../src/models/usuarioOuCoordenador'
import ListarTurmas from './components/turma/ListarTurmas'
import ListarDisciplinas from './components/disciplina/ListarDisciplinas'
import ListarSerie from './components/serie/ListarSerie'
import { UnorderedListOutlined, FormOutlined, BarChartOutlined, LockOutlined, ControlOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/login/Login';
import store from './redux/auth'
import ControleTurma from './components/turma/ControleFrequencia'
import { allRoles } from './models/roles'

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
        label: 'Professores'
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
    enableFor: ['COORDENADOR', 'FUNCIONARIO'],
    icon: <FormOutlined />,
    label: 'Cadastrar',
    opcoes: {
      funcionarios: {
        label: 'Funcionários',
        enableFor: ['FUNCIONARIO'],
        component: () =>
          <CriarFuncionarioOuCoordenador
            title='Cadastro de Funcionários'
          />
      },
      coordenadores: {
        label: 'Coordenadores',
        enableFor: ['FUNCIONARIO'],
        component: () =>
          <CriarFuncionarioOuCoordenador
            title='Cadastro de Coordenadores(as)'
          />
      },
      alunos: {
        label: 'Alunos',
        enableFor: ['COORDENADOR', 'FUNCIONARIO'],
        component: () => <CriarAluno />
      },
      professores: {
        enableFor: ['COORDENADOR', 'FUNCIONARIO'],
        label: 'Professores',
      },
      disciplinas: {
        label: 'Disciplinas',
        enableFor: ['FUNCIONARIO'],
        component: () => <CriarDisciplina />
      },
      turmas: {
        label: 'Turmas',
        enableFor: ['FUNCIONARIO'],
        component: () => <CriarTurma />
      },
      series: {
        label: 'Séries',
        enableFor: ['FUNCIONARIO'],
        component: () => <CriarSerie />
      },
    }
  },
  trancar: {
    icon: <LockOutlined />,
    label: 'Trancamentos',
    opcoes: {
      alunos: {
        label: 'Alunos',
      },
      turmas: {
        label: 'Turmas',
      }
    }
  },
  relatorio: {
    icon: <BarChartOutlined />,
    label: 'Relatórios',
    opcoes: {
      turmas: {
        label: 'Turmas',
      }
    }
  },
  controle: {
    icon: <ControlOutlined />,
    label: 'Controles',
    opcoes: {
      frequencia: {
        label: 'Frequencia',
        component: () => <ControleTurma />
      },
      notas: {
        label: 'Notas',
      }
    }
  },
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
