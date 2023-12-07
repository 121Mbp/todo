import { useEffect, useState } from 'react'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'
import Snackbar from '@mui/material/Snackbar'
import './App.scss'
import { todoAPI, randomBG } from './api'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'


const App = () => {
  const [todoData, setTodoData] = useState()
  const [source, setSource] = useState()
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [init, setInit] = useState('')
  const [progress, setProgress] = useState(true)

  const fetchData = async () => {
    try {
      const getList = await todoAPI('/todo', 'GET', null)
      setTodoData(getList.data.data)
    } catch (err) {
      console.log('에러: ' + err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [ message ])

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
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='App'>
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
