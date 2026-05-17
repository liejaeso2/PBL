function AddLionForm({
    form,
    isLoading,
    onChangeForm,
    onSubmitForm,
    onFillRandomForm
}) {
    return (
        <form className="add-form" onSubmit={onSubmitForm}>
            <h2>아기 사자 추가</h2>

            <label>
                이름
                <input
                    name="name"
                    value={form.name}
                    onChange={onChangeForm}
                    placeholder="이름"
                />
            </label>

            <label>
                파트
                <select name="part" value={form.part} onChange={onChangeForm}>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>
            </label>

            <label>
                전화번호
                <input
                    name="phone"
                    value={form.phone}
                    onChange={onChangeForm}
                    placeholder="전화번호"
                />
            </label>

            <label>
                이메일
                <input
                    name="email"
                    value={form.email}
                    onChange={onChangeForm}
                    placeholder="이메일"
                />
            </label>

            <label>
                이미지 주소
                <input
                    name="image"
                    value={form.image}
                    onChange={onChangeForm}
                    placeholder="이미지 주소"
                />
            </label>

            <label>
                한 줄 소개
                <input
                    name="intro"
                    value={form.intro}
                    onChange={onChangeForm}
                    placeholder="한 줄 소개"
                />
            </label>

            <label>
                상세 자기소개
                <textarea
                    name="detail"
                    value={form.detail}
                    onChange={onChangeForm}
                    placeholder="상세 자기소개"
                />
            </label>

            <div className="button-group">
                <button type="button" onClick={onFillRandomForm} disabled={isLoading}>
                    랜덤 값 채우기
                </button>

                <button type="submit" disabled={isLoading}>
                    추가하기
                </button>
            </div>
        </form>
    );
}

export default AddLionForm;