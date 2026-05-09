function Controls({ totalCount }) {
    return (
        <section className="panel">
            <div className="top-control-row">
                <button type="button" className="main-btn">
                    아기 사자 추가
                </button>

                <button type="button" className="main-btn">
                    마지막 아기 사자 삭제
                </button>

                <span className="total-count">총 {totalCount}명</span>

                <div className="status-area">
                    <span className="status-label">상태</span>
                    <span className="status-text ready">준비 완료</span>
                    <button type="button" className="retry-btn hidden">
                        재시도
                    </button>
                </div>
            </div>

            <div className="top-control-row">
                <button type="button" className="main-btn">
                    랜덤 1명 추가
                </button>

                <button type="button" className="main-btn">
                    랜덤 5명 추가
                </button>

                <button type="button" className="main-btn">
                    전체 새로고침
                </button>
            </div>
        </section>
    );
}

export default Controls;