import type { Lion } from '../types/lion';

interface LionCardProps {
    lion: Lion;
}

function LionCard({ lion }: LionCardProps) {
    return (
        <article className="lion-card">
            <img src={lion.image} alt={`${lion.name} 프로필`} />
            <h3>{lion.name}</h3>
            <p>{lion.part}</p>
            <p>{lion.email}</p>
        </article>
    );
}

export default LionCard;