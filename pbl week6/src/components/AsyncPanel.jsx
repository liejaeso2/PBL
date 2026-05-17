function AsyncPanel({
    status,
    message,
    isLoading,
    canRetry,
    onAddRandomOne,
    onAddRandomFive,
    onRefreshAll,
    onRetry
}) {
    return (
        <section className="async-panel">
            <h2>외부 데이터 불러오기</h2>

            <div className="button-group">
                <button type="button" onClick={onAddRandomOne} disabled={isLoading}>
                    랜덤 1명 추가
                </button>

                <button type="button" onClick={onAddRandomFive} disabled={isLoading}>
                    랜덤 5명 추가
                </button>

                <button type="button" onClick={onRefreshAll} disabled={isLoading}>
                    전체 새로고침
                </button>
            </div>

            <p>{message}</p>

            {status === "error" && canRetry && (
                <button type="button" onClick={onRetry} disabled={isLoading}>
                    재시도
                </button>
            )}
        </section>
    );
}

export default AsyncPanel;