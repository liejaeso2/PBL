function ViewOptions() {
    return (
        <section className="panel">
            <h2 className="section-title">보기 옵션</h2>

            <div className="view-option-row">
                <div className="view-option">
                    <label htmlFor="partFilter">파트 필터</label>
                    <select id="partFilter" defaultValue="all">
                        <option value="all">전체</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Design">Design</option>
                    </select>
                </div>

                <div className="view-option">
                    <label htmlFor="sortOption">정렬 방식</label>
                    <select id="sortOption" defaultValue="latest">
                        <option value="latest">최신추가순</option>
                        <option value="name">이름순</option>
                    </select>
                </div>

                <div className="view-option search-option">
                    <label htmlFor="searchName">이름 검색</label>
                    <input id="searchName" type="text" placeholder="이름을 입력하세요" />
                </div>
            </div>
        </section>
    );
}

export default ViewOptions;