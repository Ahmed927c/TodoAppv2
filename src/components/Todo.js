import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Todo = () => {
    const [task, setTask] = useState('');
    const [tasklist, setTaskList] = useState([]);
    const [notification, setNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });

    const handleChange = e => {
        setTask(e.target.value);
    };
// Add task with date and time

    const AddTask = () => {
        if (task !== '') {
            const taskDetails = {
                id: Math.floor(Math.random() * 1000),
                value: task,
                date: date.toLocaleDateString(),
                time: time.toLocaleTimeString(),
                isCompleted: false,
               
                
            };

            setTaskList([...tasklist, taskDetails]);
            setNotification(true);
            setNotificationText('Task Added');
            setNotificationType('success');
            setTask('');
        }
    };

    const EditTask = id => {
        const newTask = prompt('Edit Task');
        setTaskList(
            tasklist.map(task => {
                if (task.id === id) {
                    task.value = newTask;
                }
                return task;
            }),
        );
        setNotification(true);
        setNotificationText('Task Edited');
        setNotificationType('success');
    };
    const deletetask = (e, id) => {
        e.preventDefault();
        setTaskList(tasklist.filter(t => t.id !== id));
        setNotification(true);
        setNotificationText('Task Deleted');
        setNotificationType('danger');
    };

    const taskCompleted = (e, id) => {
        e.preventDefault();
        setTaskList(
            tasklist.map(task => {
                if (task.id === id) {
                    task.isCompleted = !task.isCompleted;
                }
                return task;
            }),
        );
    };

    const closeNotification = () => {
        setNotification(false);
    };

    useEffect(() => {
        const data = localStorage.getItem('tasklist');
        if (data) {
            setTaskList(JSON.parse(data));
        }
        // add time to local storage
        const time = localStorage.getItem('time');
        if (time) {
            setTime(JSON.parse(time));
        }
    }, [time]);

    useEffect(() => {
        delete localStorage.setItem('tasklist', JSON.stringify(tasklist));
    }, [tasklist]);

    return (
        <>
            <Container>
                <h1>Todo List</h1>
                <div className="date">
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </div>
                <InputContainer>
                    <input
                        type="text"
                        placeholder="Add Task"
                        value={task}	
                        onChange={handleChange}
                       
                    />
                    <button className="btn btn-success" onClick={AddTask}>
                        Add
                    </button>
                </InputContainer>
                <TaskList>
                    {tasklist.map(task => (
                        <Task key={task.id}>
                            <div className="task">
                                <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={e => taskCompleted(e, task.id)}
                                />
                                <p className={task.isCompleted ? 'completed' : ''}>
                                    {task.value}
                                </p>
                            </div>
                            <div className="buttons">
                                <button
                                    onClick={() => EditTask(task.id)}
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={e => deletetask(e, task.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </Task>
                    ))}
                </TaskList>

                {notification && (
                    <Notification notification={notification} type={notificationType}>
                        {' '}
                        {notificationText}
                        <button onClick={closeNotification}>X</button>
                    </Notification>
                )}
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    h1 {
        font-size: 3rem;
        font-weight: 700;
        color: #1e90ff;
        margin-bottom: 1rem;
    }
    .date {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }
        .date {
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 1.5rem;
        }
        .date {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 320px) {
        h1 {
            font-size: 1rem;
        }
        .date {
            font-size: 0.6rem;
        }
    }
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
        width: 50%;
        padding: 1rem;
        font-size: 1.5rem;
        border: none;
        outline: none;
        border-radius: 0.5rem 0 0 0.5rem;
    }
    button {
        padding: 1rem;
        font-size: 1.5rem;
        border: none;
        outline: none;
        background-color: #333;
        color: #fff;
        border-radius: 0 0.5rem 0.5rem 0;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        input {
            width: 70%;
            font-size: 1rem;
        }
        button {
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        input {
            width: 80%;
            font-size: 0.8rem;
        }
        button {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 320px) {
        input {
            width: 90%;
            font-size: 0.6rem;
        }
        button {
            font-size: 0.6rem;
        }
    }
`;

const TaskList = styled.div`^
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    
    	
    @media (max-width: 768px) {
        margin-top: 1rem;
       
    }

    @media (max-width: 480px) {
        margin-top: 0.5rem;
    }

    @media (max-width: 320px) {
        margin-top: 0.2rem;
    }

`;

const Task = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #fff;
    object-fit: cover;
    box-sizing: border-box;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    .task {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
            cursor: pointer;
        }
        p {
            font-size: 1.5rem;
            color: #333;
            &.completed {
                text-decoration: line-through;
            }
        }
    }
    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
            padding: 0.5rem 1rem;
            font-size: 1.5rem;
            border: none;
            outline: none;
            background-color: #333;
            color: #fff;
            border-radius: 0.5rem;
            margin-left: 1rem;
            cursor: pointer;
        }
    }

    @media (max-width: 768px) {
        width: 70%;
        .task {
            input {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: 0.5rem;
            }
            p {
                display: flex;

                font-size: 1rem;
            }
        }
        .buttons {
            button {
                padding: 0.3rem 0.5rem;
                font-size: 1rem;
                margin-left: 0.5rem;
            }
        }
    }

    @media (max-width: 480px) {
        width: 80%;
        .task {
            input {
                width: 1.2rem;
                height: 1.2rem;
                margin-right: 0.3rem;
            }
            p {
                font-size: 0.8rem;
            }
        }
        .buttons {
            button {
                padding: 0.2rem 0.3rem;
                font-size: 0.8rem;
                margin-left: 0.3rem;
            }
        }
    }

    @media (max-width: 320px) {
        width: 90%;
        .task {
            input {
                width: 1rem;
                height: 1rem;
                margin-right: 0.2rem;
            }
            p {
                font-size: 0.6rem;
            }
        }
        .buttons {
            button {
                padding: 0.1rem 0.2rem;
                font-size: 0.6rem;
                margin-left: 0.2rem;
            }
        }
    }
`;

const Notification = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;

    padding: 1rem;
    font-size: 1.5rem;
    color: #fff;
    background-color: ${props => (props.type === 'success' ? '#28a745' : '#dc3545')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        border: none;
        outline: none;
        background-color: #333;
        color: #fff;
        border-radius: 0.5rem;
        margin-left: 1rem;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 30%;
        padding: 0.5rem;
        font-size: 1rem;
        button {
            padding: 0.3rem 0.5rem;
            font-size: 1rem;
            margin-left: 0.5rem;
        }
    }

    @media (max-width: 480px) {
        width: 40%;
        padding: 0.3rem;
        font-size: 0.8rem;
        button {
            padding: 0.2rem 0.3rem;
            font-size: 0.8rem;
            margin-left: 0.3rem;
        }
    }

    @media (max-width: 320px) {
        width: 50%;
        padding: 0.2rem;
        font-size: 0.6rem;
        button {
            padding: 0.1rem 0.2rem;
            font-size: 0.6rem;
            margin-left: 0.2rem;
        }
    }
`;

export default Todo;
