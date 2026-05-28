import type { Lion } from '../types/lion';

interface LionDetailProps {
    lion: Lion;
}

function LionDetail({ lion }: LionDetailProps) {
    return (
        <article className="lion-detail">
            <img src={lion.image} alt={`${lion.name} 상세 프로필`} />
            <div>
                <h3>{lion.name}</h3>
                <p>파트: {lion.part}</p>
                <p>나이: {lion.age}</p>
                <p>이메일: {lion.email}</p>
                <p>{lion.introduction}</p>
            </div>
        </article>
    );
}

export default LionDetail;