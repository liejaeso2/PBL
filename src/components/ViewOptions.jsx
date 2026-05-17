function ViewOptions({
    filterPart,
    sortType,
    searchText,
    onChangeFilterPart,
    onChangeSortType,
    onChangeSearchText
}) {
    return (
        <section className="view-options">
            <h2>보기 옵션</h2>

            <label>
                파트 필터
                <select value={filterPart} onChange={onChangeFilterPart}>
                    <option value="전체">전체</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>
            </label>

            <label>
                정렬 방식
                <select value={sortType} onChange={onChangeSortType}>
                    <option value="최신추가순">최신추가순</option>
                    <option value="이름순">이름순</option>
                </select>
            </label>

            <label>
                이름 검색
                <input
                    type="text"
                    value={searchText}
                    onChange={onChangeSearchText}
                    placeholder="이름을 입력하세요"
                />
            </label>
        </section>
    );
}

export default ViewOptions;