function LionDetail({ lion }) {
    return (
        <article className="lion-detail">
            <h3>{lion.name}</h3>
            <p>파트: {lion.part}</p>
            <p>전화번호: {lion.phone}</p>
            <p>이메일: {lion.email}</p>
            <p>{lion.detail}</p>
        </article>
    );
}

export default LionDetail;