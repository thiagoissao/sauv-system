import React, { useState, useEffect } from 'react'
import './App.less'
import Layout from './Layout'
import CriarDisciplina from './components/disciplina/CriarDisciplina'
import CriarTurma from './components/turma/CriarTurma'
import CriarSerie from './components/serie/CriarSerie'
import CriarCoordenador from './components/coordenador/CriarCoordenador'
import ListarCoordenador from './components/coordenador/ListarCoordenador'
import CriarFuncionario from './components/funcionario/CriarFuncionario'
import ListarFuncionario from './components/funcionario/ListarFuncionario'
import CriarAluno from './components/aluno/CriarAluno'
import ListarAluno from "./components/aluno/ListarAluno"
import { mockAlunoList } from "./models/aluno"
import CriarProfessor from "./components/professor/CriarProfessor"
import ListarProfessor from "./components/professor/ListarProfessor"
import { mockCoordenadorList } from '../src/models/coordenador'
import { mockFuncionarioList } from '../src/models/funcionario'
import ListarTurmas from './components/turma/ListarTurmas'
import ListarDisciplinas from './components/disciplina/ListarDisciplinas'
import ListarSerie from './components/serie/ListarSerie'
import { UnorderedListOutlined, FormOutlined, LockOutlined, ControlOutlined, BookOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/login/Login';
import store, { loginUser } from './redux/auth.js';
import ControleFrequencia from './components/turma/ControleFrequencia'
import ControleNotas from './components/nota/ControleNotas'
import TrancarTurma from './components/turma/TrancarTurma'
import TrancarAluno from './components/aluno/TrancarAluno'
import RelatorioTurma from './components/relatório/RelatorioTurma'
import ControleTrocarAlunoTurma from './components/aluno/ControleTrocarAlunoTurma'
import { ALLROLES, ROLE } from './utils/enum'


const menuOptions = {
  visualizar: {
    icon: <UnorderedListOutlined />,
    label: 'Visualizar',
    enableFor: ALLROLES,
    opcoes: {
      funcionarios: {
        enableFor: ALLROLES,
        label: 'Funcionários',
        component: () =>
          <ListarFuncionario
            list={mockFuncionarioList}
            tipo='Funcionários'
          />
      },
      coordenadores: {
        enableFor: ALLROLES,
        label: 'Coordenadores',
        component: () =>
          <ListarCoordenador
            list={mockCoordenadorList}
            tipo='Coordenadores'
          />
      },
      alunos: {
        enableFor: ALLROLES,
        label: 'Alunos',
        component: () =>
          <ListarAluno
            list={mockAlunoList}
            tipo="Alunos"
          />
      },
      professores: {
        enableFor: ALLROLES,
        label: 'Professores',
        component: () =>
          <ListarProfessor tipo="Professores" />
      },
      disciplinas: {
        enableFor: ALLROLES,
        label: 'Disciplinas',
        component: () => <ListarDisciplinas />
      },
      turmas: {
        enableFor: ALLROLES,
        label: 'Turmas',
        component: () => <ListarTurmas />
      },
      series: {
        enableFor: ALLROLES,
        label: 'Séries',
        component: () => <ListarSerie />
      },
    }
  },
  cadastrar: {
    enableFor: [ROLE.coordenador, ROLE.funcionario],
    icon: <FormOutlined />,
    label: 'Cadastrar',
    opcoes: {
      funcionarios: {
        label: 'Funcionários',
        enableFor: [ROLE.funcionario],
        component: () =>
          <CriarFuncionario
            title='Cadastro de Funcionários'
          />
      },
      coordenadores: {
        label: 'Coordenadores',
        enableFor: [ROLE.funcionario],
        component: () =>
          <CriarCoordenador
            title='Cadastro de Coordenadores(as)'
          />
      },
      alunos: {
        label: 'Alunos',
        enableFor: [ROLE.coordenador, ROLE.funcionario],
        component: () => <CriarAluno />
      },
      professores: {
        enableFor: [ROLE.coordenador, ROLE.funcionario],
        label: 'Professores',
        component: () => <CriarProfessor />
      },
      disciplinas: {
        label: 'Disciplinas',
        enableFor: [ROLE.funcionario],
        component: () => <CriarDisciplina title='Cadastro de Disciplina' />
      },
      turmas: {
        label: 'Turmas',
        enableFor: [ROLE.funcionario],
        component: () => <CriarTurma title='Cadastro de Turma' />
      },
      series: {
        label: 'Séries',
        enableFor: [ROLE.funcionario],
        component: () => <CriarSerie title='Cadastro de Série' />
      },
    }
  },
  trancar: {
    enableFor: [ROLE.coordenador, ROLE.funcionario],
    icon: <LockOutlined />,
    label: 'Trancamentos',
    opcoes: {
      alunos: {
        label: 'Alunos',
        enableFor: [ROLE.coordenador, ROLE.funcionario],
        component: () => <TrancarAluno title='Trancamento de Aluno' />
      },
      turmas: {
        label: 'Turmas',
        enableFor: [ROLE.coordenador, ROLE.funcionario],
        component: () => <TrancarTurma title="Trancamento de Turma" />
      },
    }
  },
  relatorio: {
    enableFor: ALLROLES,
    icon: <BookOutlined />,
    label: 'Relatórios',
    opcoes: {
      relatorioTurma: {
        enableFor: ALLROLES,
        label: "Relatório de Turma",
        component: () => <RelatorioTurma title="Relatório de Turma" />
      },
    },
  },
  controle: {
    enableFor: ALLROLES,
    icon: <ControlOutlined />,
    label: 'Controles',
    opcoes: {
      trocarAlunoTurma: {
        label: 'Trocar Aluno-Turma',
        enableFor: [ROLE.coordenador],
        component: () => <ControleTrocarAlunoTurma />
      },
      frequencia: {
        label: 'Frequência',
        enableFor: [ROLE.professor],
        component: () => <ControleFrequencia />
      },
      notas: {
        enableFor: [ROLE.professor],
        label: 'Notas',
        component: () => <ControleNotas />
      }
    }
  }
}

const App = () => {
  const [selectedKeys, setSelectedKeys] = useState('visualizar:usuarios')
  const { loggedIn } = store.getState();

  useEffect(() => {
    if(loggedIn) {
      store.dispatch(loginUser(JSON.parse(localStorage.getItem('usuario'))));
    }
  }, [])

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
