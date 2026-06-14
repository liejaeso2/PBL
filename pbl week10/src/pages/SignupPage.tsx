import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';

interface SignupPageProps {
    onSignUp: (
        email: string,
        password: string
    ) => Promise<string | null>;
}

function SignupPage({
    onSignUp,
}: SignupPageProps) {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState<string>('');
    const [password, setPassword] =
        useState<string>('');
    const [passwordCheck, setPasswordCheck] =
        useState<string>('');
    const [error, setError] =
        useState<string | null>(null);
    const [loading, setLoading] =
        useState<boolean>(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (
            !email.trim() ||
            !password ||
            !passwordCheck
        ) {
            setError('모든 항목을 입력해주세요.');
            return;
        }

        if (password.length < 6) {
            setError(
                '비밀번호는 최소 6자 이상이어야 합니다.'
            );
            return;
        }

        if (password !== passwordCheck) {
            setError(
                '비밀번호 확인이 일치하지 않습니다.'
            );
            return;
        }

        setLoading(true);
        setError(null);

        const errorMessage = await onSignUp(
            email.trim(),
            password
        );

        setLoading(false);

        if (errorMessage) {
            console.error(errorMessage);
            setError(
                `회원가입에 실패했습니다: ${errorMessage}`
            );
            return;
        }

        navigate('/', { replace: true });
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>회원가입</h1>

                <p className="auth-description">
                    이메일과 비밀번호로 계정을
                    만들어주세요.
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="signup-email">
                        이메일
                    </label>

                    <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="이메일을 입력하세요"
                        autoComplete="email"
                    />

                    <label htmlFor="signup-password">
                        비밀번호
                    </label>

                    <input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        placeholder="6자 이상 입력하세요"
                        autoComplete="new-password"
                    />

                    <label htmlFor="password-check">
                        비밀번호 확인
                    </label>

                    <input
                        id="password-check"
                        type="password"
                        value={passwordCheck}
                        onChange={(event) =>
                            setPasswordCheck(
                                event.target.value
                            )
                        }
                        placeholder="비밀번호를 다시 입력하세요"
                        autoComplete="new-password"
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
                            ? '가입 중...'
                            : '회원가입'}
                    </button>
                </form>

                <p className="auth-link-text">
                    이미 계정이 있나요?
                    <Link to="/login">
                        로그인
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

export default SignupPage;