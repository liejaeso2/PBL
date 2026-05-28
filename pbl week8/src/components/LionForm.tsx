import type { ChangeEvent, FormEvent } from 'react';
import type { Part } from '../types/lion';

interface FormState {
    name: string;
    part: Part;
    age: string;
    email: string;
    image: string;
    introduction: string;
}

interface LionFormProps {
    form: FormState;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onFillRandom: () => void;
}

function LionForm({ form, onChange, onSubmit, onFillRandom }: LionFormProps) {
    return (
        <section className="form-section">
            <h2>직접 추가</h2>

            <form onSubmit={onSubmit}>
                <input name="name" value={form.name} onChange={onChange} placeholder="이름" />

                <select name="part" value={form.part} onChange={onChange}>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>

                <input name="age" value={form.age} onChange={onChange} placeholder="나이" />

                <input name="email" value={form.email} onChange={onChange} placeholder="이메일" />

                <input name="image" value={form.image} onChange={onChange} placeholder="이미지 URL" />

                <textarea
                    name="introduction"
                    value={form.introduction}
                    onChange={onChange}
                    placeholder="자기소개"
                />

                <div className="button-area">
                    <button type="button" onClick={onFillRandom}>
                        랜덤 값 채우기
                    </button>
                    <button type="submit">추가</button>
                </div>
            </form>
        </section>
    );
}

export default LionForm;    