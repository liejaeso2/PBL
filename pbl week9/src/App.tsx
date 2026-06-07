import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './hooks/useAuth';

function App() {
    const {
        user,
        authLoading,
        signUp,
        signIn,
        signOut,
    } = useAuth();

    const handleSignOut = async () => {
        const errorMessage = await signOut();

        if (errorMessage) {
            window.alert(
                `로그아웃에 실패했습니다: ${errorMessage}`
            );
        }
    };

    if (authLoading) {
        return (
            <main className="auth-page">
                <p className="message">
                    로그인 상태를 확인하는 중입니다...
                </p>
            </main>
        );
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <HomePage
                        user={user}
                        onSignOut={handleSignOut}
                    />
                }
            />

            <Route
                path="/lions/:id"
                element={<DetailPage />}
            />

            <Route
                path="/login"
                element={
                    user ? (
                        <Navigate
                            to="/"
                            replace
                        />
                    ) : (
                        <LoginPage
                            onSignIn={signIn}
                        />
                    )
                }
            />

            <Route
                path="/signup"
                element={
                    user ? (
                        <Navigate
                            to="/"
                            replace
                        />
                    ) : (
                        <SignupPage
                            onSignUp={signUp}
                        />
                    )
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />
        </Routes>
    );
}

export default App;