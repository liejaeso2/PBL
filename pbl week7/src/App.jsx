import React, { useState } from "react";
import {
    Link,
    Navigate,
    Route,
    Routes,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { initialLions } from "./data/lions.js";

const parts = ["Frontend", "Backend", "Design"];

const emptyForm = {
    name: "",
    nickname: "",
    part: "Frontend",
    mbti: "",
    contact: "",
    intro: "",
    detail: "",
    skills: "",
};

function makeId() {
    return "lion-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

function getFilteredLions(lions, part, sort, keyword) {
    let result = [...lions];

    if (part !== "all") {
        result = result.filter((lion) => lion.part === part);
    }

    if (keyword.trim() !== "") {
        const lowerKeyword = keyword.toLowerCase();

        result = result.filter((lion) => {
            const text = [
                lion.name,
                lion.nickname,
                lion.part,
                lion.intro,
                lion.detail,
                ...(lion.skills || []),
            ]
                .join(" ")
                .toLowerCase();

            return text.includes(lowerKeyword);
        });
    }

    if (sort === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "part") {
        result.sort((a, b) => a.part.localeCompare(b.part));
    } else {
        result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
}

function App() {
    const [lions, setLions] = useState(initialLions);
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [lastRequest, setLastRequest] = useState(null);

    async function loadRandomLions(count, mode) {
        setLoading(true);
        setError("");
        setLastRequest({ count, mode });

        try {
            const response = await fetch(
                `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`
            );

            if (!response.ok) {
                throw new Error("외부 데이터를 불러오지 못했습니다.");
            }

            const data = await response.json();

            const newLions = data.results.map((user, index) => {
                const part = parts[index % parts.length];

                return {
                    id: makeId(),
                    name: `${user.name.first} ${user.name.last}`,
                    nickname: user.login.username,
                    part: part,
                    mbti: ["ENFP", "ISTJ", "INTP", "ISFP"][index % 4],
                    contact: user.email,
                    intro: `${part} 파트에 관심이 있는 아기사자입니다.`,
                    detail:
                        "외부 API로 추가된 멤버입니다. 함께 프로젝트를 진행하며 성장하고 싶습니다.",
                    skills:
                        part === "Frontend"
                            ? ["React", "Router", "CSS"]
                            : part === "Backend"
                                ? ["API", "Server", "DB"]
                                : ["Figma", "UI", "UX"],
                    image: user.picture.large,
                    createdAt: Date.now() + index,
                };
            });

            if (mode === "replace") {
                setLions(newLions);
            } else {
                setLions([...newLions, ...lions]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function retry() {
        if (lastRequest) {
            loadRandomLions(lastRequest.count, lastRequest.mode);
        }
    }

    function addLion(event) {
        event.preventDefault();

        if (
            form.name.trim() === "" ||
            form.nickname.trim() === "" ||
            form.intro.trim() === ""
        ) {
            setError("이름, 닉네임, 한 줄 소개는 반드시 입력해야 합니다.");
            return;
        }

        const newLion = {
            id: makeId(),
            name: form.name.trim(),
            nickname: form.nickname.trim(),
            part: form.part,
            mbti: form.mbti.trim() || "미입력",
            contact: form.contact.trim() || "미입력",
            intro: form.intro.trim(),
            detail: form.detail.trim() || "아직 상세 소개가 입력되지 않았습니다.",
            skills: form.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill !== ""),
            image: `https://api.dicebear.com/8.x/adventurer/svg?seed=${form.nickname}`,
            createdAt: Date.now(),
        };

        setLions([newLion, ...lions]);
        setForm(emptyForm);
        setError("");
    }

    function deleteLion(id) {
        setLions(lions.filter((lion) => lion.id !== id));
    }

    function fillRandomForm() {
        const num = Math.floor(Math.random() * 1000);

        setForm({
            name: `새 멤버 ${num}`,
            nickname: `lion${num}`,
            part: parts[num % parts.length],
            mbti: ["ENFP", "ISTJ", "INTP", "ISFP"][num % 4],
            contact: `lion${num}@example.com`,
            intro: "함께 배우면서 성장하고 싶은 아기사자입니다.",
            detail:
                "React Router를 활용한 페이지 이동과 상태 관리를 연습하고 있습니다.",
            skills: "React, JavaScript, CSS",
        });
    }

    return (
        <div className="app">
            <header className="header">
                <Link to="/" className="logo">
                    🦁 아기사자 대시보드
                </Link>
                <p>React Router로 목록 페이지와 상세 페이지 나누기</p>
            </header>

            {loading && (
                <div className="status loading">데이터를 불러오는 중입니다.</div>
            )}

            {error && (
                <div className="status error">
                    <span>{error}</span>
                    {lastRequest && <button onClick={retry}>다시 시도</button>}
                </div>
            )}

            <Routes>
                <Route
                    path="/"
                    element={
                        <ListPage
                            lions={lions}
                            form={form}
                            setForm={setForm}
                            addLion={addLion}
                            deleteLion={deleteLion}
                            fillRandomForm={fillRandomForm}
                            loadRandomLions={loadRandomLions}
                            loading={loading}
                        />
                    }
                />

                <Route path="/lions/:lionId" element={<DetailPage lions={lions} />} />

                <Route path="/lions" element={<Navigate to="/" replace />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

function ListPage({
    lions,
    form,
    setForm,
    addLion,
    deleteLion,
    fillRandomForm,
    loadRandomLions,
    loading,
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const part = searchParams.get("part") || "all";
    const sort = searchParams.get("sort") || "latest";
    const keyword = searchParams.get("q") || "";

    function changeOption(key, value) {
        const nextParams = new URLSearchParams(searchParams);

        if (key === "part" && value === "all") {
            nextParams.delete("part");
        } else if (key === "sort" && value === "latest") {
            nextParams.delete("sort");
        } else if (key === "q" && value.trim() === "") {
            nextParams.delete("q");
        } else {
            nextParams.set(key, value);
        }

        setSearchParams(nextParams);
    }

    function resetOptions() {
        setSearchParams({});
    }

    const filteredLions = getFilteredLions(lions, part, sort, keyword);

    return (
        <main className="page">
            <section className="title-area">
                <div>
                    <h1>아기사자 목록</h1>
                    <p>
                        목록 페이지에서는 요약 카드만 보여주고 상세 정보는 상세 페이지에서
                        확인합니다.
                    </p>
                </div>

                <div className="count-box">
                    <strong>{filteredLions.length}</strong>
                    <span>/ {lions.length}명</span>
                </div>
            </section>

            <section className="box">
                <h2>보기 옵션</h2>

                <div className="controls">
                    <label>
                        파트 필터
                        <select
                            value={part}
                            onChange={(e) => changeOption("part", e.target.value)}
                        >
                            <option value="all">전체</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Design">Design</option>
                        </select>
                    </label>

                    <label>
                        정렬
                        <select
                            value={sort}
                            onChange={(e) => changeOption("sort", e.target.value)}
                        >
                            <option value="latest">최신 추가순</option>
                            <option value="name">이름순</option>
                            <option value="part">파트순</option>
                        </select>
                    </label>

                    <label>
                        검색
                        <input
                            value={keyword}
                            onChange={(e) => changeOption("q", e.target.value)}
                            placeholder="이름, 닉네임, 기술 검색"
                        />
                    </label>

                    <button className="sub-button" onClick={resetOptions}>
                        옵션 초기화
                    </button>
                </div>

                <p className="hint">
                    필터, 정렬, 검색 값은 URL 쿼리 파라미터와 연결됩니다.
                </p>
            </section>

            <section className="box">
                <div className="box-head">
                    <h2>명단 조작</h2>

                    <div className="button-group">
                        <button
                            onClick={() => loadRandomLions(1, "append")}
                            disabled={loading}
                        >
                            랜덤 1명 추가
                        </button>

                        <button
                            onClick={() => loadRandomLions(5, "append")}
                            disabled={loading}
                        >
                            랜덤 5명 추가
                        </button>

                        <button
                            className="sub-button"
                            onClick={() => loadRandomLions(6, "replace")}
                            disabled={loading}
                        >
                            전체 새로고침
                        </button>
                    </div>
                </div>

                <form className="form" onSubmit={addLion}>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="이름 *"
                    />

                    <input
                        value={form.nickname}
                        onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                        placeholder="닉네임 *"
                    />

                    <select
                        value={form.part}
                        onChange={(e) => setForm({ ...form, part: e.target.value })}
                    >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Design">Design</option>
                    </select>

                    <input
                        value={form.mbti}
                        onChange={(e) => setForm({ ...form, mbti: e.target.value })}
                        placeholder="MBTI"
                    />

                    <input
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder="연락처"
                    />

                    <input
                        value={form.skills}
                        onChange={(e) => setForm({ ...form, skills: e.target.value })}
                        placeholder="관심 기술, 쉼표로 구분"
                    />

                    <textarea
                        value={form.intro}
                        onChange={(e) => setForm({ ...form, intro: e.target.value })}
                        placeholder="한 줄 소개 *"
                    />

                    <textarea
                        value={form.detail}
                        onChange={(e) => setForm({ ...form, detail: e.target.value })}
                        placeholder="상세 자기소개"
                    />

                    <div className="form-buttons">
                        <button type="button" className="sub-button" onClick={fillRandomForm}>
                            랜덤 값 채우기
                        </button>

                        <button type="submit">직접 추가</button>
                    </div>
                </form>
            </section>

            <section className="box">
                <h2>요약 카드 목록</h2>

                {filteredLions.length === 0 ? (
                    <div className="empty">조건에 맞는 아기사자가 없습니다.</div>
                ) : (
                    <div className="card-grid">
                        {filteredLions.map((lion) => (
                            <article className="card" key={lion.id}>
                                <Link to={`/lions/${lion.id}`} className="card-link">
                                    <img src={lion.image} alt={`${lion.name} 프로필`} />

                                    <span className={`part ${lion.part.toLowerCase()}`}>
                                        {lion.part}
                                    </span>

                                    <h3>{lion.name}</h3>
                                    <p className="nickname">@{lion.nickname}</p>
                                    <p className="intro">{lion.intro}</p>
                                </Link>

                                <button
                                    className="delete-button"
                                    onClick={() => deleteLion(lion.id)}
                                >
                                    삭제
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

function DetailPage({ lions }) {
    const { lionId } = useParams();
    const navigate = useNavigate();

    const lion = lions.find((item) => item.id === lionId);

    if (!lion) {
        return (
            <main className="page">
                <section className="box center">
                    <h1>멤버를 찾을 수 없습니다.</h1>
                    <p>존재하지 않거나 삭제된 상세 페이지입니다.</p>
                    <Link to="/" className="link-button">
                        목록으로 돌아가기
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="detail-buttons">
                <button className="sub-button" onClick={() => navigate(-1)}>
                    뒤로가기
                </button>
                <Link to="/" className="link-button">
                    목록으로 돌아가기
                </Link>
            </div>

            <section className="detail-box">
                <div className="profile-top">
                    <img src={lion.image} alt={`${lion.name} 프로필`} />

                    <div>
                        <span className={`part ${lion.part.toLowerCase()}`}>
                            {lion.part}
                        </span>

                        <h1>{lion.name}</h1>
                        <p className="nickname">@{lion.nickname}</p>
                        <p className="intro big">{lion.intro}</p>
                    </div>
                </div>

                <div className="info-grid">
                    <div>
                        <span>MBTI</span>
                        <strong>{lion.mbti}</strong>
                    </div>

                    <div>
                        <span>연락처</span>
                        <strong>{lion.contact}</strong>
                    </div>

                    <div>
                        <span>파트</span>
                        <strong>{lion.part}</strong>
                    </div>

                    <div>
                        <span>등록 시간</span>
                        <strong>{new Date(lion.createdAt).toLocaleString("ko-KR")}</strong>
                    </div>
                </div>

                <div className="detail-section">
                    <h2>자기소개</h2>
                    <p>{lion.detail}</p>
                </div>

                <div className="detail-section">
                    <h2>관심 기술</h2>

                    {lion.skills.length === 0 ? (
                        <p>등록된 관심 기술이 없습니다.</p>
                    ) : (
                        <div className="skill-list">
                            {lion.skills.map((skill) => (
                                <span key={skill}>{skill}</span>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

function NotFound() {
    return (
        <main className="page">
            <section className="box center">
                <h1>페이지를 찾을 수 없습니다.</h1>
                <p>주소를 다시 확인해 주세요.</p>
                <Link to="/" className="link-button">
                    목록으로 이동
                </Link>
            </section>
        </main>
    );
}

export default App;