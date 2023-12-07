import { useEffect, useState } from 'react'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'
import Snackbar from '@mui/material/Snackbar'
import './App.scss'
import { todoAPI, randomBG, LocalDatabase } from './api'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const App = () => {
  const [todoData, setTodoData] = useState()
  const [source, setSource] = useState()
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [init, setInit] = useState('')
  const [progress, setProgress] = useState(true)
  const [server, setServer] = useState(false)

  const fetchData = async () => {
    try {
      const getList = await todoAPI('/todo', 'GET', null)
      setTodoData(getList.data.data)
    } catch (err) {
      console.log('에러: ' + err)
      setServer(true)
    }
    if(server) {
      setTodoData(JSON.parse(localStorage.getItem('todo')) || [])
    }
  }

  useEffect(() => {
    fetchData()
  }, [ message, server ])

  useEffect(() => {
    const unsplash = async () => {
      const response = await randomBG()
      setSource(response?.data)
      setInit('로딩')
      document.body.style.backgroundImage = `url(${ source?.urls?.regular })`
      setTimeout(() => {
        setProgress(false)
      }, 1000);
    }
    unsplash()
  }, [ init ])

  const onInsertTodo = async (data) => {
      if(data === 'error') {
        setOpen(true)
        setMessage('두 글자 이상으로 작성해주세요.')
        return 
      }
      try {
          setMessage('')
          await todoAPI('/todo', 'POST', data)
          setOpen(true)
          setMessage('글 등록 완료')
      } catch (err) {
          console.log('에러: ' + err)
      }
      if(server) {
        setMessage('')
        const no = todoData.length > 0 ? todoData[todoData.length -1].id +1 : 0
        const result = [...todoData, {...data, 'id': no, 'done': false}]
        setTodoData(result)
        localStorage.setItem('todo', JSON.stringify(result))
        setOpen(true)
        setMessage('글 등록 완료')
      }
  }

  const deleteTodoId = async (id) => {
    setMessage('')
    try {
      await todoAPI('/todo', 'DELETE', id)
      setOpen(true)
      setMessage('삭제 되었습니다.')
    } catch (err) {
      console.log('에러: ' + err)
    }
    if(server) {
      const result = todoData.filter(t => t.id !== id.id)
      setTodoData(result)
      localStorage.removeItem('todo')
      localStorage.setItem('todo', JSON.stringify(result))
      setOpen(true)
      setMessage('삭제 되었습니다.')
    }
  }

  const handleCheckedDone = async (data) => {
    try {
      await todoAPI('/todo', 'PUT', data)
      setOpen(true)
      if(data.done) {
        setMessage('할일을 완료하였습니다.')
      } else {
        setMessage('완료를 취소하였습니다.')
      } 
    } catch (err) {
      console.log('에러: ' + err)
    }
    if(server) { 
      const f = todoData.filter(t => t.id !== data.id)
      const result = [...f, data]
      result.sort((a, b) => a.id - b.id)
      setTodoData(result)
      setOpen(true)
      if(data.done) {
        setMessage('할일을 완료하였습니다.')
      } else {
        setMessage('완료를 취소하였습니다.')
      }
      localStorage.removeItem('todo')
      localStorage.setItem('todo', JSON.stringify(todoData))
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='App'>
      <div className='links'>
        Photo by
        <a href={ source?.user?.portfolio_url } target='_blank'>{ source?.user?.username }</a>
        randomly picked from <a href='https://unsplash.com/' target='_blank'>Unsplash</a>
      </div>
      <TodoList 
        todoData={ todoData } 
        deleteTodoId={ deleteTodoId } 
        handleCheckedDone={ handleCheckedDone } 
      />
      <TodoInsert 
        onInsertTodo={ onInsertTodo } 
        source={ source }
      />
      <Snackbar
        open={ open }
        onClose={ handleClose }
        message={ message }
      />
      {
        progress ? (
          <Box 
            sx={{ 
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: '#fff',
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'opacity .6s',
              pointerEvents: 'none'
            }}
            >
            <CircularProgress />
          </Box>
        ) : ''
      }
    </div>
  )
}

export default App;
