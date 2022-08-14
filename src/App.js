import React, {useState, useEffect} from 'react';
import './App.css';

const listContainerStyle = {
  width: '30%', 
  margin: '50px auto 0 auto', 
  fontSize: '1.5em', 
  fontWeight: 'bold'
}


export const App = () => {
  const [storageLength, setStorageLength] = useState(0);

  useEffect(() => {
    setStorageLength(prev => localStorage.length)
  }, []);

  const [userInput, setUserInput] = useState('');
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('Tasks')) || [])

  useEffect(() => {
    const allTasks = localStorage.getItem('Tasks');
    setTasks(JSON.parse(allTasks))
  }, [])

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }, [tasks])

  const handleAddClick = () => {
    if(userInput.length < 1) {
      alert('Text field cannot be empty')
      return
    }
    setTasks((prev) => 
      prev ? [...tasks, {
        id: storageLength + 1,
        text: userInput 
      }] : [{
        id: storageLength + 1,
        text: userInput 
      }]
    );
    setStorageLength(storageLength+1)
    setUserInput('');
  }

  const handleRemoveClick = (idToRemove) => {
    console.log(idToRemove)
    const newTask = tasks.filter(item => item.id !== idToRemove);
    console.log(newTask);
    setTasks(newTask)
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleAddClick();
    }
  }

  return (
    <div className='container' style={{backgroundColor: '#9DC5BB', color: 'white'}}>
      <h1>Create your To-Do list</h1>
      <div className='userInput'>
        <input placeholder='Empty your mind' value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyPress={handleKeyPress} style={{border: 'none', borderRadius: '10px'}}/>
        <button 
        onClick={handleAddClick} 
        style={{backgroundColor: '#5e807f', color: 'white', fontWeight: 'Bold'}} 
        className='Add'
        onMouseEnter={({target}) => target.style.backgroundColor = '#527170'}
        onMouseLeave={({target}) => target.style.backgroundColor = '#5e807f'}
        >
          ADD
        </button>
      </div>
      <div className='listContainer' style={listContainerStyle}>
        <ol>
          {tasks && tasks.map(item => <List Task={item} removeTask={handleRemoveClick} />)}
        </ol>
      </div>
    </div>
  )
}

const List = (props) => {
  const {Task, removeTask} = props;

  const handleClick = () => {
    removeTask(Task.id);
  }

  return(
    <li style={{marginTop: '20px', backgroundColor: '#5e807f', color: 'whitesmoke', border: 'none', borderRadius: '10px'}}>
      {Task.text}
      <button 
        className='delete' 
        style={{ float:'right', margin:'5px', background: 'none', border:'none', borderRadius: '50%'}} 
        onClick={handleClick}
        onMouseEnter={({target}) => target.style.background = 'white'}
        onMouseLeave={({target}) => target.style.background = 'none'}
      >
        &times;
      </button>
    </li>
  )
}





