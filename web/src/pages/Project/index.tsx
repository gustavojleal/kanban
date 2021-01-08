import React, { useMemo, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FiPower } from 'react-icons/all'
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  Profile,
  HeaderContent,

  Board,
  Boards,
  Dropzone,
  Card
} from './styles';

let projects = {
  columns: [
    {column: 1,name: "to Do",  backgroundColor: "orange"},
    {column: 3, name: "blocked",  backgroundColor: "orange"},
    {column: 2,name: "in Progress",  backgroundColor: "yellow"},
    {column: 4, name: "done",  backgroundColor: "grey"},

  ],
	tasks: [
    {id: "5", column: 1, taskName: "buy milk", description: "Comprar leite sem lactose " ,status: "blue"},
    {id: "1", column: 2, taskName: "Read book", description: " " ,status: "red"},
    {id: "2", column: 2, taskName: "Pay bills", description: " " ,status:"green"},
    {id: "3", column: 3, taskName: "Go gym", description: " " ,status:"blue"},
    {id: "4", column: 4, taskName: "Play baseball", description: " " ,status:"green"}
	]
}


interface IProject {
  column: {
    column: number;
    name: string;
    backgroundColor: string;
  }
  taks: {
    id: string;
    column: number;
    taskName: string;
    status: string;
  }
}

interface IColumn {
  column: number;
  name: string;
  backgroundColor: string;
}
interface ICard {
  id: string;
  column: number;
  taskName: string;
  description: string;
  status: string;
}


const Project: React.FC = () => {
  const { user, signOut } = useAuth();
  const [endDrag, setEndDrag] = useState(0);
  
  const bordColumns = useMemo(() => {
    return projects.columns.sort((a, b) => (a.column < b.column) ? -1 : 1)
  }, [])
 
  const cardList = (col: number) => {
    return projects.tasks.filter(task => task.column === col);
  }

   const dropped =((card: ICard) => {
    if (card.column !== endDrag) { 
      const newColumns = projects.tasks.filter(task => task.id !== card.id)

      const newCardPosition =  {
        id: card.id,
        column: endDrag,
        taskName: card.taskName,
        status: card.status,
        description: card.description
      } 
      newColumns.push(newCardPosition)
      projects.tasks = newColumns
      setEndDrag(0)
      return
    }
  })

  return (
  <Container>
    <Header>
    <HeaderContent>
      <img src={logoImg} alt="Easy Kanban" />

      <Profile>
        <img src={user.avatar_url} alt={user.name} />
        <div>
          <span>Bem-vindo,</span>
          <Link to="/profile">
            <strong>{user.name}</strong>
          </Link>
        </div>
      </Profile>

      <button type="button" onClick={signOut}>
        <FiPower />
      </button>
    </HeaderContent>
  </Header>

      <DragDropContext onDragEnd={() => ((true))}>
        
        <Droppable droppableId="droppable">
          {(provided) => (
            <Boards 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {bordColumns.map(column => (
                <Board 
                  key={column.column} 
                  onDragOver={() => { setEndDrag(column.column)}} 
                >
                  <span>
                    {column.name}
                  </span>
                  <Dropzone className="dropzone">
                    {cardList(column.column).map(card => (
                      <>
                      <Card 
                        key={card.column} 
                        className="card" 
                        draggable="true"
                        onDragEnd={() => (dropped(card))}
                      >
                        <div>{card.taskName}</div>
                        {card.description}
                      </Card>
                      </>
                    ))}
                  </Dropzone>
    
                </Board>
              ))}
              {provided.placeholder}
            </Boards>
          )}

        </Droppable>  
        
      </DragDropContext>
    </Container>

  );
}

export default Project;

