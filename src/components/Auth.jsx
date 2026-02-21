import { useState } from 'react';

function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate auth by just passing the email as the user
        if (email && password) {
            onLogin({ email, name: email.split('@')[0] });
        }
    };

    return (
        <div className="glass-panel" style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>
                {isLogin ? 'Welcome Back' : 'Join the Team'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </button>
            </form>

            <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ background: 'none', color: 'white', textDecoration: 'underline', padding: 0 }}
                >
                    {isLogin ? 'Sign Up' : 'Log In'}
                </button>
            </p>
        </div>
    );
}

export default Auth;
