import LionCard from "./LionCard.jsx";
import EmptyState from "./EmptyState.jsx";

function LionCardList({ lions }) {
    if (lions.length === 0) {
        return <EmptyState message="조건에 맞는 아기 사자가 없습니다." />;
    }

    return (
        <div className="card-list">
            {lions.map((lion) => (
                <LionCard key={lion.id} lion={lion} />
            ))}
        </div>
    );
}

export default LionCardList;