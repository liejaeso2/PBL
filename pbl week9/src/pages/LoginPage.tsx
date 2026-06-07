import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';

interface LoginPageProps {
    onSignIn: (
        email: string,
        password: string
    ) => Promise<string | null>;
}

function LoginPage({
    onSignIn,
}: LoginPageProps) {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState<string>('');
    const [password, setPassword] =
        useState<string>('');
    const [error, setError] =
        useState<string | null>(null);
    const [loading, setLoading] =
        useState<boolean>(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!email.trim() || !password) {
            setError(
                '이메일과 비밀번호를 모두 입력해주세요.'
            );
            return;
        }

        setLoading(true);
        setError(null);

        const errorMessage = await onSignIn(
            email.trim(),
            password
        );

        setLoading(false);

        if (errorMessage) {
            console.error(errorMessage);
            setError(
                '이메일 또는 비밀번호가 올바르지 않습니다.'
            );
            return;
        }

        navigate('/', { replace: true });
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>로그인</h1>

                <p className="auth-description">
                    아기 사자를 추가하거나 삭제하려면
                    로그인해주세요.
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="login-email">
                        이메일
                    </label>

                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="이메일을 입력하세요"
                        autoComplete="email"
                    />

                    <label htmlFor="login-password">
                        비밀번호
                    </label>

                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        placeholder="비밀번호를 입력하세요"
                        autoComplete="current-password"
                    />

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? '로그인 중...'
                            : '로그인'}
                    </button>
                </form>

                <p className="auth-link-text">
                    계정이 없나요?
                    <Link to="/signup">
                        회원가입
                    </Link>
                </p>

                <Link
                    className="back-link"
                    to="/"
                >
                    명단으로 돌아가기
                </Link>
            </section>
        </main>
    );
}

export default LoginPage;