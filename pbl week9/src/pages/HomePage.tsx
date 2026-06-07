import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

import ControlPanel from '../components/ControlPanel';
import LionCard from '../components/LionCard';
import LionDetail from '../components/LionDetail';
import LionForm from '../components/LionForm';

import { supabase } from '../lib/supabase';
import { rowToLion } from '../utils/lionMapper';
import type {
    Lion,
    Part,
    RandomUserResponse,
} from '../types/lion';

interface HomePageProps {
    user: User | null;
    onSignOut: () => Promise<void>;
}

interface FormState {
    name: string;
    part: Part;
    age: string;
    email: string;
    image: string;
    introduction: string;
}

const parts: Part[] = ['Frontend', 'Backend', 'Design'];

function HomePage({
    user,
    onSignOut,
}: HomePageProps) {
    const [lions, setLions] = useState<Lion[]>([]);
    const [filterPart, setFilterPart] =
        useState<'All' | Part>('All');
    const [sortType, setSortType] =
        useState<'latest' | 'name'>('latest');
    const [searchText, setSearchText] =
        useState<string>('');
    const [loading, setLoading] =
        useState<boolean>(true);
    const [error, setError] =
        useState<string | null>(null);

    const [form, setForm] = useState<FormState>({
        name: '',
        part: 'Frontend',
        age: '',
        email: '',
        image: '',
        introduction: '',
    });

    const loadLions = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: loadError } =
                await supabase
                    .from('lions')
                    .select('*')
                    .order('created_at', {
                        ascending: false,
                    });

            if (loadError) {
                throw loadError;
            }

            setLions((data ?? []).map(rowToLion));
        } catch (loadError) {
            console.error(loadError);
            setError(
                '아기 사자 명단을 불러오지 못했습니다.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadLions();
    }, []);

    useEffect(() => {
        document.title = `아기 사자 ${lions.length}명`;
    }, [lions.length]);

    const getRandomPart = (): Part => {
        const index = Math.floor(
            Math.random() * parts.length
        );

        return parts[index];
    };

    const fetchRandomLions = async (
        count: number
    ): Promise<Lion[]> => {
        const response = await fetch(
            `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`
        );

        if (!response.ok) {
            throw new Error(
                '외부 데이터를 불러오지 못했습니다.'
            );
        }

        const data: RandomUserResponse =
            await response.json();

        return data.results.map((randomUser, index) => ({
            id: Date.now() + index,
            name: `${randomUser.name.first} ${randomUser.name.last}`,
            part: getRandomPart(),
            age: randomUser.dob.age,
            email: randomUser.email,
            image: randomUser.picture.large,
            introduction:
                '외부 API를 통해 추가된 아기 사자입니다.',
            createdAt: Date.now() + index,
        }));
    };

    const handleAddRandom = async (count: number) => {
        try {
            setLoading(true);
            setError(null);

            const newLions =
                await fetchRandomLions(count);

            // 현재 단계에서는 화면 상태에만 추가됩니다.
            // 다음 단계에서 Supabase 저장으로 변경합니다.
            setLions((prev) => [
                ...newLions,
                ...prev,
            ]);
        } catch (randomError) {
            console.error(randomError);
            setError(
                '데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        await loadLions();
    };

    const handleFormChange = (
        event: ChangeEvent<
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (
            !form.name ||
            !form.age ||
            !form.email ||
            !form.image ||
            !form.introduction
        ) {
            setError(
                '직접 추가할 정보를 모두 입력해주세요.'
            );
            return;
        }

        const newLion: Lion = {
            id: Date.now(),
            name: form.name,
            part: form.part,
            age: Number(form.age),
            email: form.email,
            image: form.image,
            introduction: form.introduction,
            createdAt: Date.now(),
        };

        // 현재 단계에서는 화면 상태에만 추가됩니다.
        // 다음 단계에서 Supabase 저장으로 변경합니다.
        setLions((prev) => [newLion, ...prev]);

        setForm({
            name: '',
            part: 'Frontend',
            age: '',
            email: '',
            image: '',
            introduction: '',
        });

        setError(null);
    };

    const handleFillRandomForm = async () => {
        try {
            setLoading(true);
            setError(null);

            const randomLions =
                await fetchRandomLions(1);

            const randomLion = randomLions[0];

            setForm({
                name: randomLion.name,
                part: randomLion.part,
                age: String(randomLion.age),
                email: randomLion.email,
                image: randomLion.image,
                introduction:
                    randomLion.introduction,
            });
        } catch (randomError) {
            console.error(randomError);
            setError(
                '랜덤 값을 채우지 못했습니다.'
            );
        } finally {
            setLoading(false);
        }
    };

    const visibleLions = lions
        .filter((lion) => {
            if (filterPart === 'All') {
                return true;
            }

            return lion.part === filterPart;
        })
        .filter((lion) =>
            lion.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
        )
        .sort((firstLion, secondLion) => {
            if (sortType === 'name') {
                return firstLion.name.localeCompare(
                    secondLion.name
                );
            }

            return (
                secondLion.createdAt -
                firstLion.createdAt
            );
        });

    return (
        <main className="app">
            <div className="auth-bar">
                {user ? (
                    <>
                        <span>{user.email}</span>

                        <button
                            type="button"
                            onClick={() =>
                                void onSignOut()
                            }
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            로그인
                        </Link>

                        <Link to="/signup">
                            회원가입
                        </Link>
                    </>
                )}
            </div>

            <ControlPanel
                count={lions.length}
                filterPart={filterPart}
                sortType={sortType}
                searchText={searchText}
                loading={loading}
                error={error}
                onAddOne={() =>
                    void handleAddRandom(1)
                }
                onAddFive={() =>
                    void handleAddRandom(5)
                }
                onRefresh={() =>
                    void handleRefresh()
                }
                onFilterChange={setFilterPart}
                onSortChange={setSortType}
                onSearchChange={setSearchText}
            />

            <LionForm
                form={form}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onFillRandom={() =>
                    void handleFillRandomForm()
                }
            />

            <section className="card-section">
                <h2>요약 카드</h2>

                {visibleLions.length === 0 &&
                    !loading ? (
                    <p className="message">
                        조건에 맞는 아기 사자가
                        없습니다.
                    </p>
                ) : (
                    <div className="card-grid">
                        {visibleLions.map((lion) => (
                            <LionCard
                                key={lion.id}
                                lion={lion}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className="detail-section">
                <h2>상세 소개</h2>

                {visibleLions.length === 0 &&
                    !loading ? (
                    <p className="message">
                        상세 정보를 표시할 데이터가
                        없습니다.
                    </p>
                ) : (
                    <div className="detail-list">
                        {visibleLions.map((lion) => (
                            <LionDetail
                                key={lion.id}
                                lion={lion}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default HomePage;