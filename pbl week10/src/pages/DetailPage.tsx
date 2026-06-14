import { useEffect, useState } from 'react';
import {
    Link,
    useParams,
} from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { rowToLion } from '../utils/lionMapper';
import type { Lion } from '../types/lion';

function DetailPage() {
    const { id } = useParams<{ id: string }>();

    const [lion, setLion] =
        useState<Lion | null>(null);
    const [loading, setLoading] =
        useState<boolean>(true);
    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        const loadLion = async () => {
            if (!id) {
                setError(
                    '아기 사자 번호가 올바르지 않습니다.'
                );
                setLoading(false);
                return;
            }

            const lionId = Number(id);

            if (Number.isNaN(lionId)) {
                setError(
                    '아기 사자 번호가 올바르지 않습니다.'
                );
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const {
                    data,
                    error: loadError,
                } = await supabase
                    .from('lions')
                    .select('*')
                    .eq('id', lionId)
                    .maybeSingle();

                if (loadError) {
                    throw loadError;
                }

                if (!data) {
                    setError(
                        '해당 아기 사자를 찾을 수 없습니다.'
                    );
                    return;
                }

                setLion(rowToLion(data));
            } catch (loadError) {
                console.error(loadError);
                setError(
                    '상세 정보를 불러오지 못했습니다.'
                );
            } finally {
                setLoading(false);
            }
        };

        void loadLion();
    }, [id]);

    if (loading) {
        return (
            <main className="detail-page">
                <p className="message">
                    상세 정보를 불러오는 중입니다...
                </p>
            </main>
        );
    }

    if (error || !lion) {
        return (
            <main className="detail-page">
                <section className="detail-page-card">
                    <p className="error-message">
                        {error ??
                            '데이터를 찾을 수 없습니다.'}
                    </p>

                    <Link to="/">
                        명단으로 돌아가기
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="detail-page">
            <section className="detail-page-card">
                <img
                    src={lion.image}
                    alt={`${lion.name} 프로필`}
                />

                <h1>{lion.name}</h1>

                <dl>
                    <div>
                        <dt>파트</dt>
                        <dd>{lion.part}</dd>
                    </div>

                    <div>
                        <dt>나이</dt>
                        <dd>{lion.age}</dd>
                    </div>

                    <div>
                        <dt>이메일</dt>
                        <dd>{lion.email}</dd>
                    </div>
                </dl>

                <p className="detail-introduction">
                    {lion.introduction}
                </p>

                <Link to="/">
                    명단으로 돌아가기
                </Link>
            </section>
        </main>
    );
}

export default DetailPage;