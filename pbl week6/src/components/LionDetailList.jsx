import LionDetail from "./LionDetail.jsx";
import EmptyState from "./EmptyState.jsx";

function LionDetailList({ lions }) {
    if (lions.length === 0) {
        return <EmptyState message="상세 정보를 표시할 아기 사자가 없습니다." />;
    }

    return (
        <div className="detail-list">
            {lions.map((lion) => (
                <LionDetail key={lion.id} lion={lion} />
            ))}
        </div>
    );
}

export default LionDetailList;