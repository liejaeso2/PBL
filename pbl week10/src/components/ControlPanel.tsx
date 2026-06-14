import type { Part } from '../types/lion';

interface ControlPanelProps {
    count: number;
    filterPart: 'All' | Part;
    sortType: 'latest' | 'name';
    searchText: string;
    loading: boolean;
    error: string | null;
    onAddOne: () => void;
    onAddFive: () => void;
    onRefresh: () => void;
    onFilterChange: (value: 'All' | Part) => void;
    onSortChange: (value: 'latest' | 'name') => void;
    onSearchChange: (value: string) => void;
}

function ControlPanel({
    count,
    filterPart,
    sortType,
    searchText,
    loading,
    error,
    onAddOne,
    onAddFive,
    onRefresh,
    onFilterChange,
    onSortChange,
    onSearchChange,
}: ControlPanelProps) {
    return (
        <section className="control-panel">
            <h2>아기 사자 대시보드</h2>

            <p>현재 명단 수: {count}명</p>

            <div className="button-area">
                <button onClick={onAddOne} disabled={loading}>
                    랜덤 1명 추가
                </button>
                <button onClick={onAddFive} disabled={loading}>
                    랜덤 5명 추가
                </button>
                <button onClick={onRefresh} disabled={loading}>
                    전체 새로고침
                </button>
            </div>

            <div className="filter-area">
                <select
                    value={filterPart}
                    onChange={(e) => onFilterChange(e.target.value as 'All' | Part)}
                >
                    <option value="All">전체</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>

                <select
                    value={sortType}
                    onChange={(e) => onSortChange(e.target.value as 'latest' | 'name')}
                >
                    <option value="latest">최신추가순</option>
                    <option value="name">이름순</option>
                </select>

                <input
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="이름 검색"
                />
            </div>

            {loading && <p className="message">데이터를 불러오는 중입니다...</p>}
            {error && <p className="error-message">{error}</p>}
        </section>
    );
}

export default ControlPanel;