import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const handleToggleCompleted = (id) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return {...task, completed: !task.completed };
            }
            return task;
        }));
    };

    const handleEditTask = (id, text) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return {...task, text };
            }
            return task;
        }));
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return ( <
        div >
        <
        h1 > To - Do List < /h1> <
        form onSubmit = { handleSubmit }
        className = "add-task" >
        <
        input type = "text"
        value = { newTask }
        onChange = {
            (event) => setNewTask(event.target.value) }
        placeholder = "Add new task" /
        >
        <
        button type = "submit" > Add Task < /button> <
        /form> <
        ul className = "todo-list" > {
            tasks.map((task) => ( <
                li key = { task.id }
                className = { task.completed ? 'completed' : '' } >
                <
                input type = "checkbox"
                checked = { task.completed }
                onChange = {
                    () => handleToggleCompleted(task.id) }
                /> <
                span > { task.text } < /span> <
                button onClick = {
                    () => {
                        const newText = prompt('Edit task:', task.text);
                        if (newText !== null) {
                            handleEditTask(task.id, newText);
                        }
                    }
                } >
                Edit <
                /button> <
                button onClick = {
                    () => handleDeleteTask(task.id) } > Delete < /button> <
                /li>
            ))
        } <
        /ul> <
        /div>
    );
}

ReactDOM.render( < TodoList / > , document.getElementById('root'));