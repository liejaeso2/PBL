import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import './index.css';
import ControlPanel from './components/ControlPanel';
import LionCard from './components/LionCard';
import LionDetail from './components/LionDetail';
import LionForm from './components/LionForm';

import { initialLions } from './data/initialLions';
import type { Lion, Part, RandomUserResponse } from './types/lion';

interface FormState {
    name: string;
    part: Part;
    age: string;
    email: string;
    image: string;
    introduction: string;
}

const parts: Part[] = ['Frontend', 'Backend', 'Design'];

function App() {
    const [lions, setLions] = useState<Lion[]>(initialLions);
    const [filterPart, setFilterPart] = useState<'All' | Part>('All');
    const [sortType, setSortType] = useState<'latest' | 'name'>('latest');
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<FormState>({
        name: '',
        part: 'Frontend',
        age: '',
        email: '',
        image: '',
        introduction: '',
    });

    useEffect(() => {
        document.title = `아기 사자 ${lions.length}명`;
    }, [lions.length]);

    const getRandomPart = (): Part => {
        const index = Math.floor(Math.random() * parts.length);
        return parts[index];
    };

    const fetchRandomLions = async (count: number): Promise<Lion[]> => {
        const response = await fetch(
            `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`
        );

        if (!response.ok) {
            throw new Error('외부 데이터를 불러오지 못했습니다.');
        }

        const data: RandomUserResponse = await response.json();

        return data.results.map((user, index) => ({
            id: Date.now() + index,
            name: `${user.name.first} ${user.name.last}`,
            part: getRandomPart(),
            age: user.dob.age,
            email: user.email,
            image: user.picture.large,
            introduction: '외부 API를 통해 추가된 아기 사자입니다.',
            createdAt: Date.now() + index,
        }));
    };

    const handleAddRandom = async (count: number) => {
        try {
            setLoading(true);
            setError(null);

            const newLions = await fetchRandomLions(count);
            setLions((prev) => [...newLions, ...prev]);
        } catch {
            setError('데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        try {
            setLoading(true);
            setError(null);

            const newLions = await fetchRandomLions(5);
            setLions(newLions);
        } catch {
            setError('새로고침에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.name || !form.age || !form.email || !form.image || !form.introduction) {
            setError('직접 추가할 정보를 모두 입력해주세요.');
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

            const randomLions = await fetchRandomLions(1);
            const randomLion = randomLions[0];

            setForm({
                name: randomLion.name,
                part: randomLion.part,
                age: String(randomLion.age),
                email: randomLion.email,
                image: randomLion.image,
                introduction: randomLion.introduction,
            });
        } catch {
            setError('랜덤 값을 채우지 못했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const visibleLions = lions
        .filter((lion) => {
            if (filterPart === 'All') return true;
            return lion.part === filterPart;
        })
        .filter((lion) => lion.name.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a, b) => {
            if (sortType === 'name') {
                return a.name.localeCompare(b.name);
            }

            return b.createdAt - a.createdAt;
        });

    return (
        <main className="app">
            <ControlPanel
                count={lions.length}
                filterPart={filterPart}
                sortType={sortType}
                searchText={searchText}
                loading={loading}
                error={error}
                onAddOne={() => handleAddRandom(1)}
                onAddFive={() => handleAddRandom(5)}
                onRefresh={handleRefresh}
                onFilterChange={setFilterPart}
                onSortChange={setSortType}
                onSearchChange={setSearchText}
            />

            <LionForm
                form={form}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onFillRandom={handleFillRandomForm}
            />

            <section className="card-section">
                <h2>요약 카드</h2>

                {visibleLions.length === 0 ? (
                    <p className="message">조건에 맞는 아기 사자가 없습니다.</p>
                ) : (
                    <div className="card-grid">
                        {visibleLions.map((lion) => (
                            <LionCard key={lion.id} lion={lion} />
                        ))}
                    </div>
                )}
            </section>

            <section className="detail-section">
                <h2>상세 소개</h2>

                {visibleLions.length === 0 ? (
                    <p className="message">상세 정보를 표시할 데이터가 없습니다.</p>
                ) : (
                    <div className="detail-list">
                        {visibleLions.map((lion) => (
                            <LionDetail key={lion.id} lion={lion} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default App;