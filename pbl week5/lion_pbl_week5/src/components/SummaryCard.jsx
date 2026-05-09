function SummaryCard({ lion }) {
    return (
        <article className="lion-card">
            <div className="card-image-box">
                {lion.image ? (
                    <img src={lion.image} alt={`${lion.name} 프로필 이미지`} />
                ) : (
                    <div className="no-image">{lion.name[0]}</div>
                )}

                <span className="skill-badge">{lion.badge}</span>

                {lion.isMe ? <span className="mine-badge">내 카드</span> : null}
            </div>

            <div className="card-content">
                <h3>{lion.name}</h3>
                <p className="part-name">{lion.part}</p>
                <p>{lion.oneLine}</p>
            </div>
        </article>
    );
}

export default SummaryCard;