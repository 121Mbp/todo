import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

const TodoList = ({ todoData, deleteTodoId, handleCheckedDone }) => {
    const d = new Date()
    const date = `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`
    const [checked, setChecked] = useState([])
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value)
      const newChecked = [...checked]

      if (currentIndex === -1) {
        newChecked.push(value)
      } else {
        newChecked.splice(currentIndex, 1)
      }
      setChecked(newChecked)
    }

    useEffect(() => {
      const arr = []
      todoData?.map((item) => {
        if(item.done === true) arr.push(item.id)
      })  
      setChecked(arr)
      handleToggle(checked)    
    }, [ todoData ])
    
    const handleDelete = (id) => {
      deleteTodoId({'id': id})
    }

    const handleChecked = (e, id) => {
      const result = todoData.filter((me => me.id === id))
      result[0].done = e.target.checked
      handleCheckedDone({...result[0], 'done': result[0].done})
    }

    return (
      <div className='header'>
        <h1 className='logo'><span>{ date }</span>Todo List</h1>
        <ul className='tasks'>
        {
          todoData?.slice(0).reverse().map((item, i) => (
            <li className={ item.done ? 'complete' : '' } key={ item.id }>
              <label>
                <input 
                  type='checkbox' 
                  checked={ checked.indexOf( item.id ) !== -1 }
                  onClick={ handleToggle( item.id ) }
                  onChange={ (e) => handleChecked(e, item.id) }
                />
                <span>{ item.title }</span>
              </label>
              <DeleteIcon 
                sx={{
                  cursor: 'pointer'
                }}
                onClick={ () => handleDelete(item.id) }
              />
            </li>
          ))
        }
        </ul>
      </div>
    )
}

export default TodoList