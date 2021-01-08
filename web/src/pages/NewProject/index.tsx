import React, { useEffect, useState, useRef, } from "react";
import { FiPlusCircle, FiMinusCircle, FiXCircle, FiEdit3, MdDoneAll } from 'react-icons/all'
import { useHistory } from "react-router-dom";

import api from '../../services/api'

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import {
  Header,
  HeaderContent,
  Profile,
  Container,
  Board,
  Boards
} from './styles'

const columns = [
    { column: 1, title: "to Do", removable: false, newCol: false },
    { column: 2, title: "in Progress", removable: false, newCol: false },
    { column: 3, title: "done", removable: false, newCol: false },
  ]

const Project: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const nameRef = useRef<HTMLInputElement>(null);

  const [boardColumns, setBoardColumns] = useState(columns);
      console.log()
  const [todo, setTodo] = useState<"add" | "remove" | "edit" | null>(null)
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    if (todo === null && index === null) return

    if (todo === null && index !== null) { //Remove from the boardColumns
      const newBoard = boardColumns.filter((column) => column.column !== index );
      setBoardColumns(newBoard)

      const lengthColumn = boardColumns.length;
      boardColumns[lengthColumn - 1].column = lengthColumn - 1;

     
    }

    if (todo === "add") {
      const lengthColumn = boardColumns.length;

      boardColumns[lengthColumn - 1].column = lengthColumn+1;

      const newColumn = {
        column: lengthColumn,
        title: "NewColumn",
        removable: true,
        newCol: true
      }
      
      boardColumns.push(newColumn)
      boardColumns.sort((a, b) => (a.column < b.column) ? -1 : 1)
    }
    if (todo === "edit") {
      return
    }
    setTodo(null)
    setIndex(null)
  }, [todo, index, boardColumns])

  const edit = ((event: any, title: string, position: number) => {
    event.preventDefault()
   
    columns.map((column, index) => {
      if (column.column === position) {
        columns[index].title = event.target.value;
      } 
      return setTodo("edit")
    })
  })


  const handleSubmit = async () => {
    try {
      const projectName = nameRef.current?.value;

      const data = { name: projectName, structure: boardColumns }
      console.log(data)
      await api.post('/projects', data)

      history.push('/')
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no Kanban!',
      });
      
    } catch (err) {
      console.log(err)
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
      });

    }

  }

  return (
    <div>
      <Container>
          <Header>
            <HeaderContent>
              <img src={logoImg} alt="Easy Kanban" />
            
              <Profile>
                <img src={user.avatar_url} alt={user.name} />
                {user.name}
              </Profile>
            
            </HeaderContent>
          </Header>


        <Boards>
          {boardColumns.map(column => (
            <Board key={column.column}>

              <span className={column.title}>
                <input placeholder={column.title} key={column.column} onChange={(e) => edit(e, column.title, column.column) }></input>

                <button type="button" key={column.title} onClick={() => { setTodo("edit") }}><FiEdit3 /></button>
                <span><br /><br />
                  {column.removable
                    ?
                    <button type="button" key={column.column} onClick={() =>  setIndex(column.column)}>
                      <FiMinusCircle />
                    </button>
                    :
                    <span><FiXCircle /></span>
                  }
                  <span>
                    {column.newCol
                      ?
                      <span>Remove</span>
                      :
                      ""
                    }
                  </span>
                </span>
              </span>

            </Board>
          ))}
          <button type="button" key={1} onClick={() => {setTodo("add")}}>
            <FiPlusCircle/>
          </button>
        </Boards>

        <form onSubmit={handleSubmit}>
          <input ref={nameRef}  placeholder="Project name :" ></input>
          <button type="submit">
            <MdDoneAll /> <span>Save</span>
          </button>
        </form>
      </Container>

    </div>
  );
};
export default Project