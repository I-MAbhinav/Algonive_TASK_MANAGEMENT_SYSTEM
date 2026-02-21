function TaskCard({ task, onUpdateStatus, onDelete }) {
    const statusColors = {
        pending: 'badge-pending',
        'in progress': 'badge-progress',
        completed: 'badge-completed',
    };

    const statusOptions = ['pending', 'in progress', 'completed'];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{task.title}</h3>
                <span className={`badge ${statusColors[task.status]}`}>
                    {task.status}
                </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>👤 {task.assignee}</span>
                    <span style={{
                        color: new Date(task.deadline) < new Date() && task.status !== 'completed' ? 'var(--danger)' : 'inherit',
                        fontWeight: new Date(task.deadline) < new Date() && task.status !== 'completed' ? 'bold' : 'normal'
                    }}>
                        📅 {task.deadline} {new Date(task.deadline) < new Date() && task.status !== 'completed' ? '(Overdue)' : ''}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                        value={task.status}
                        onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                        style={{ padding: '0.25rem', fontSize: '0.85rem', width: 'auto' }}
                    >
                        {statusOptions.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => onDelete(task.id)}
                        style={{ background: 'none', color: 'var(--danger)', fontSize: '1.2rem', padding: '0 0.5rem' }}
                        title="Delete Task"
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
