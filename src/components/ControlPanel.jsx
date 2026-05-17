function ControlPanel({
    count,
    isFormOpen,
    onToggleForm,
    onDeleteLastLion
}) {
    return (
        <section className="control-panel">
            <p>총 {count}명</p>

            <button type="button" onClick={onToggleForm}>
                {isFormOpen ? "추가 폼 닫기" : "아기 사자 추가"}
            </button>

            <button type="button" onClick={onDeleteLastLion} disabled={count === 0}>
                마지막 아기 사자 삭제
            </button>
        </section>
    );
}

export default ControlPanel;