import { Link } from 'react-router-dom';
import type { Lion } from '../types/lion';

interface LionCardProps {
    lion: Lion;
}

function LionCard({
    lion,
}: LionCardProps) {
    return (
        <Link
            className="lion-card-link"
            to={`/lions/${lion.id}`}
        >
            <article className="lion-card">
                <img
                    src={lion.image}
                    alt={`${lion.name} 프로필`}
                />

                <h3>{lion.name}</h3>
                <p>{lion.part}</p>
                <p>{lion.email}</p>
                <span className="detail-link-text">
                    상세보기
                </span>
            </article>
        </Link>
    );
}

export default LionCard;