import { useState } from 'react'
import made from './../logo.svg'
import ClearIcon from '@mui/icons-material/Clear'

const TodoInsert = ({ onInsertTodo, source }) => {
    const [todoContent, setTodoContent] = useState('')
    const [eraser, setEraser] = useState(false)
    const handleSubmit = () => {
        if(todoContent.length < 2) {
            return onInsertTodo('error')
        }
        if(todoContent) {
            onInsertTodo({'title': todoContent})
            setTodoContent('')
            setEraser(false)
        }
    }

    const handleChange = (e) => {
        if(e.target.value.length > 0) {
            setEraser(true)
        } else {
            setEraser(false)
        }
        setTodoContent(e.target.value)
    }

    const handleKeyEvent = (e) => {
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleEraser = () => {
        setTodoContent('')
        setEraser(false)
    }

    return (
        <div className='form'>
            <div className='input'>
                <input 
                    type='text' 
                    name='title' 
                    placeholder='New Todo' 
                    onChange={ handleChange }
                    value={ todoContent }
                    onKeyPress={ handleKeyEvent }
                />
                {
                    eraser ? (
                        <ClearIcon 
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: '4px',
                                transform: 'translateY(-50%)',
                                color: '#222',
                                cursor: 'pointer'
                            }}
                            onClick={ handleEraser }
                        />
                    ) : ''
                }
            </div>
            <button onClick={ handleSubmit }>Add Todo</button>
            <p>
                <a href='https://react.dev/' target='_blank'>Based on React</a>
                <a href='https://github.com/121Mbp' target='_blank'>Github</a>
            </p>
        </div>
    )
}

export default TodoInsert