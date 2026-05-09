function AddLionForm() {
    return (
        <section className="panel hidden">
            <h2 className="section-title">아기 사자 추가 폼</h2>

            <form>
                <div className="form-grid">
                    <div className="form-item">
                        <label htmlFor="name">이름</label>
                        <input id="name" type="text" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="part">파트</label>
                        <select id="part" defaultValue="Frontend">
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="skill">관심 기술</label>
                        <input id="skill" type="text" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="oneLine">한 줄 소개</label>
                        <input id="oneLine" type="text" />
                    </div>

                    <div className="form-item form-wide">
                        <label htmlFor="intro">자기소개</label>
                        <textarea id="intro" rows="3"></textarea>
                    </div>

                    <div className="form-item">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" type="tel" />
                    </div>

                    <div className="form-item form-wide">
                        <label htmlFor="website">Website</label>
                        <input id="website" type="url" />
                    </div>
                </div>

                <div className="form-button-row">
                    <button type="button" className="small-btn">
                        랜덤 값 채우기
                    </button>
                    <button type="button" className="small-btn dark-btn">
                        추가하기
                    </button>
                    <button type="button" className="small-btn">
                        취소
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AddLionForm;