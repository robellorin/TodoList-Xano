/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../utils/axiosInstance';
import { ITask, ITaskProps } from './Task.types';

const Task = ({ completed, id, important, task, onDelete }: ITaskProps) => {
  const [complete, setComplete] = useState(completed);
  const [importantCheck, setImportantCheck] = useState(important);
  const [loading, setLoading] = useState(false);

  const deleteTask = async () => {
    setLoading(true);

    await axiosInstance.delete(`todo/${id}`).finally(() => {
      onDelete();
      setLoading(false);
    });
  };

  const handleUpdateTask = async () => {
    setLoading(true);
    const updatedTask: ITask = {
      id,
      task,
      completed: complete,
      important: importantCheck,
    };

    await axiosInstance
      .post(`todo/${id}`, updatedTask)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (completed !== complete || important !== importantCheck) {
      handleUpdateTask();
    }

    return () => {};
  }, [complete, importantCheck]);

  return (
    <div
      style={{
        border: '1px solid black',
        width: '500px',
        height: '20px',
        padding: '40px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <p style={{ fontWeight: 'bold' }}>{task}</p>
      <div style={{ display: 'flex' }}>
        <input
          type={'checkbox'}
          style={{ marginLeft: '20px' }}
          checked={complete}
          onChange={(e: any) => setComplete(e.target.checked)}
          disabled={loading}
        />
        <p style={{ marginLeft: '10px' }}>Complete</p>
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type={'checkbox'}
          style={{ marginLeft: '20px' }}
          checked={importantCheck}
          onChange={(e: any) => setImportantCheck(e.target.checked)}
          disabled={loading}
        />
        <p style={{ marginLeft: '10px' }}>Important</p>
      </div>
      <button
        style={{
          padding: '0px 10px',
          backgroundColor: 'red',
          borderRadius: '5px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        disabled={loading}
        onClick={deleteTask}
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
