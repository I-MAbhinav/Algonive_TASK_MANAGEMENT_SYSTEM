import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

function Dashboard({ user, onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedTasks = localStorage.getItem('taskAppTasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            // Demo tasks
            setTasks([
                { id: 1, title: 'Draft Project Proposal', assignee: 'Alex', deadline: '2024-03-20', status: 'completed' },
                { id: 2, title: 'Design System Update', assignee: 'Sam', deadline: '2024-03-25', status: 'in progress' },
                { id: 3, title: 'Client Meeting Preparation', assignee: 'Alex', deadline: '2024-03-28', status: 'pending' },
            ]);
        }
    }, []);

    const saveTasks = (newTasks) => {
        setTasks(newTasks);
        localStorage.setItem('taskAppTasks', JSON.stringify(newTasks));
    };

    const handleAddTask = (newTask) => {
        saveTasks([...tasks, newTask]);
    };

    const handleUpdateStatus = (id, newStatus) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        );
        saveTasks(updatedTasks);
    };

    const handleDeleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            const updatedTasks = tasks.filter(task => task.id !== id);
            saveTasks(updatedTasks);
        }
    };

    const filteredTasks = tasks.filter(task =>
        filter === 'all' ? true : task.status === filter
    );

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.1)',
                borderRadius: '1rem', backdropFilter: 'blur(10px)'
            }}>
                <h1 style={{ fontSize: '1.5rem' }}>Welcome, {user.name}</h1>
                <button onClick={onLogout} className="btn-secondary">Log Out</button>
            </header>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '0.5rem' }}>
                    {['all', 'pending', 'in progress', 'completed'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.25rem',
                                background: filter === f ? 'var(--glass-bg)' : 'transparent',
                                color: filter === f ? 'white' : 'var(--text-muted)',
                                textTransform: 'capitalize'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                    + Add New Task
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {filteredTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onUpdateStatus={handleUpdateStatus}
                        onDelete={handleDeleteTask}
                    />
                ))}
                {filteredTasks.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No tasks found in this category.
                    </div>
                )}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTask}
            />
        </div>
    );
}

export default Dashboard;
