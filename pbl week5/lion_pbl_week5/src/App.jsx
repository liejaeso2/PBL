import lions from "./data/lions.js";

import Header from "./components/Header.jsx";
import Controls from "./components/Controls.jsx";
import ViewOptions from "./components/ViewOptions.jsx";
import AddLionForm from "./components/AddLionForm.jsx";
import SummaryCard from "./components/SummaryCard.jsx";
import DetailCard from "./components/DetailCard.jsx";

function App() {
    return (
        <div className="page-wrap">
            <Header />

            <main>
                <Controls totalCount={lions.length} />

                <ViewOptions />

                <AddLionForm />

                <section className="panel">
                    <div className="section-title-row">
                        <h2 className="yellow-title">아기 사자 자기소개 요약 카드</h2>
                        <span className="visible-count">표시 중: {lions.length}명</span>
                    </div>

                    <div className="card-grid">
                        {lions.map((lion) => (
                            <SummaryCard key={lion.id} lion={lion} />
                        ))}
                    </div>
                </section>

                <section className="panel">
                    <h2 className="section-title">상세 정보 목록</h2>

                    <div className="detail-list">
                        {lions.map((lion) => (
                            <DetailCard key={lion.id} lion={lion} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;