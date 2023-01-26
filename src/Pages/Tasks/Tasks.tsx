/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import { handleLogout } from '../../utils/handleLogout';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import Task from './components/Task/Task';
import { ITask } from './components/Task/Task.types';

type User = {
  id?: number;
  email: string;
  password: string;
  todo_id: any;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    todo_id: [],
  });
  const navigate = useNavigate();

  const getUser = async (id: number) => {
    const response = await axiosInstance.get(`user/${id}`);

    return response.data;
  };

  const updateUser = async (task: ITask) => {
    const userClone = { ...user };
    const userTodoId: number[] = [];

    userClone.todo_id.forEach((idList: any) => {
      const idTemp = idList[0]?.id;
      if (idTemp) {
        userTodoId.push(idTemp);
      }
    });
    userTodoId.push(task.id ?? 0);
    userClone.todo_id = userTodoId;

    await axiosInstance.post(`user/${user.id}`, userClone);
    const newUser = await getUser(user.id ?? 0);
    setUser(newUser);
  };

  const onDelete = async () => {
    const newUser = await getUser(user.id ?? 0);
    setUser(newUser);
  };

  const getTasks = async () => {
    const userId = parseInt(localStorage.getItem('user_id') ?? '0');
    if (!userId) return;

    let userTemp;
    if (!user.id) {
      userTemp = await getUser(userId);
      setUser(userTemp);
    } else {
      userTemp = user;
    }

    if (!userTemp) return;
    const tasks: any = [];
    userTemp.todo_id.forEach((idList: any) => {
      const taskTemp = idList[0];
      if (taskTemp) {
        tasks.push(idList[0]);
      }
    });
    setTasks(tasks);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const addTask = async (name: string, important: boolean) => {
    const task: any = {
      task: name,
      important,
      completed: false,
    };

    const response = await axiosInstance.post('todo', task);
    const responseTask: ITask = response.data;
    await updateUser(responseTask);
    await getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (user) {
      const tasks: any = [];
      user.todo_id.forEach((idList: any) => {
        const taskTemp = idList[0];
        if (taskTemp) {
          tasks.push(idList[0]);
        }
      });
      setTasks(tasks);
    }
  }, [user]);

  const renderTasks = () => (
    <>
      {tasks.map((task: ITask, index: number) => (
        <Task
          key={index}
          completed={task.completed}
          id={task.id}
          important={task.important}
          task={task.task}
          onDelete={onDelete}
        />
      ))}
    </>
  );

  return (
    <>
      <AddTaskModal open={openModal} onClose={closeModal} onSubmit={addTask} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            marginRight: '150px',
          }}
        >
          <button
            style={{
              padding: '5px 10px',
              backgroundColor: 'skyblue',
              color: 'black',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => handleLogout(navigate)}
          >
            Logout
          </button>
        </div>
        <h1>Tasks</h1>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}
        >
          <button
            style={{
              padding: '10px',
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => setOpenModal(true)}
          >
            Add Task
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '20px',
            alignItems: 'center',
            marginTop: '5%',
          }}
        >
          {tasks.length > 0 ? renderTasks() : <p>No tasks to show</p>}
        </div>
      </div>
    </>
  );
};

export default Tasks;
