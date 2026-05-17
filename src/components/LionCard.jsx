function LionCard({ lion }) {
    return (
        <article className="lion-card">
            <img src={lion.image} alt={`${lion.name} 프로필`} />

            <h3>{lion.name}</h3>
            <span>{lion.part}</span>
            <p>{lion.intro}</p>
        </article>
    );
}

export default LionCard;