import { useState } from 'react';
import { IAddTaskModal } from './AddTaskModal.types';
// @ts-ignore
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AddTaskModal = ({ open, onClose, onSubmit }: IAddTaskModal) => {
  const [name, setName] = useState('');
  const [important, setImportant] = useState(false);

  const resetStates = () => {
    setName('');
    setImportant(false);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2>Create a Task</h2>
        <form>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <p>Task Name</p>
              <input
                type={'text'}
                placeholder={'Enter task name'}
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type={'checkbox'}
                checked={important}
                onChange={(e: any) => setImportant(e.target.checked)}
              />
              <p>Important</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                onClick={(e: any) => {
                  e.preventDefault();
                  onSubmit(name, important);
                  onClose();
                  resetStates();
                }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
