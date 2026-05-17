const parts = ["Frontend", "Backend", "Design"];

function makeId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return String(Date.now() + Math.floor(Math.random() * 100000));
}

function pickPart(index) {
    return parts[index % parts.length];
}

function convertUserToLion(user, index) {
    const part = pickPart(index);
    const name = `${user.name.first} ${user.name.last}`;

    return {
        id: makeId(),
        name,
        part,
        phone: user.phone,
        email: user.email,
        image: user.picture.large,
        intro: `${part} 파트에 관심이 있는 아기 사자입니다.`,
        detail: `${name}은 ${part} 파트에서 함께 성장하고 싶은 지원자입니다.`,
        createdAt: Date.now() + index
    };
}

export async function fetchRandomLions(count) {
    const response = await fetch(
        `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`
    );

    if (!response.ok) {
        throw new Error("데이터를 불러오지 못했습니다.");
    }

    const data = await response.json();

    if (!data.results) {
        throw new Error("응답 데이터 형식이 올바르지 않습니다.");
    }

    return data.results.map((user, index) => convertUserToLion(user, index));
}

export function makeEmptyForm() {
    return {
        name: "",
        part: "Frontend",
        phone: "",
        email: "",
        image: "",
        intro: "",
        detail: ""
    };
}

export function makeLionFromForm(form) {
    return {
        id: makeId(),
        name: form.name.trim(),
        part: form.part,
        phone: form.phone.trim(),
        email: form.email.trim(),
        image:
            form.image.trim() || "https://randomuser.me/api/portraits/lego/1.jpg",
        intro: form.intro.trim() || "새롭게 합류한 아기 사자입니다.",
        detail: form.detail.trim() || "아직 상세 자기소개가 작성되지 않았습니다.",
        createdAt: Date.now()
    };
}