function DetailCard({ lion }) {
    return (
        <article className="detail-card">
            <h3>{lion.name}</h3>

            <div className="detail-part">{lion.part}</div>

            <div className="detail-info">{lion.group}</div>

            <p>{lion.intro}</p>

            <h4 className="detail-label">연락처</h4>
            <ul>
                <li>Email: {lion.email}</li>
                <li>Phone: {lion.phone}</li>
                <li>Website: {lion.website}</li>
            </ul>

            <h4 className="detail-label">관심 기술</h4>
            <ul>
                {lion.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>

            <h4 className="detail-label">한 마디</h4>
            <p>{lion.oneLine}</p>
        </article>
    );
}

export default DetailCard;