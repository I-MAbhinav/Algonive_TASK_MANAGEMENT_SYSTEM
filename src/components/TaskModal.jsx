import { useState } from 'react';

function TaskModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [assignee, setAssignee] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('pending');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, assignee, deadline, status, id: Date.now() });
        setTitle('');
        setAssignee('');
        setDeadline('');
        setStatus('pending');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', color: 'white', fontSize: '1.5rem' }}
                >
                    &times;
                </button>

                <h2 style={{ marginBottom: '1.5rem' }}>Add New Task</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Task Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Design Homepage"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Assignee</label>
                        <input
                            type="text"
                            placeholder="e.g. Sarah"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Due Date</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ flex: 1 }}>Create Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;
