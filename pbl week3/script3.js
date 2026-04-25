let babyLions = [
    {
        name: "소재일",
        part: "Frontend",
        tech: ["HTML/CSS", "JavaScript", "React"],
        summary: "정보통신공학과 3학년 23학번 소재일입니다.",
        desc: "안녕하세요! 정보통신공학과 3학년 23학번 소재일입니다. 사용자 경험을 개선하는 프론트엔드 개발에 집중하고 있습니다.",
        email: "xoal0918@hufs.ac.kr",
        phone: "010-7124-5162",
        isMe: true
    }
];

function render() {
    const grid = document.getElementById('summary-grid');
    const list = document.getElementById('detail-list');

    grid.innerHTML = '';
    list.innerHTML = '';

    babyLions.forEach((lion, index) => {
        const sCard = document.createElement('div');
        sCard.className = `summary-card ${lion.isMe ? 'my-card' : ''}`;
        sCard.innerHTML = `
            <div class="card-img" style="background: ${getGradient(index)}">
                <span class="badge">${lion.tech[0]}</span>
            </div>
            <h3 style="margin: 0;">${lion.name}</h3>
            <p style="color: #5d5fef; font-weight: bold; font-size: 14px; margin: 8px 0;">${lion.part}</p>
            <p style="color: #64748b; font-size: 13px;">${lion.summary}</p>
        `;
        grid.appendChild(sCard);

        const dCard = document.createElement('div');
        dCard.className = 'detail-card';
        dCard.innerHTML = `
            <h3 style="margin-top: 0;">${lion.name} (${lion.part})</h3>
            <p>${lion.desc}</p>
            <p><strong>기술 스택:</strong> ${lion.tech.join(', ')}</p>
            <p style="color: #888; font-size: 13px;">${lion.email} | ${lion.phone}</p>
        `;
        list.appendChild(dCard);
    });

    document.getElementById('counter').innerText = `총 ${babyLions.length}명`;
}

function getGradient(index) {
    const gradients = [
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    ];
    return gradients[index % gradients.length];
}

document.getElementById('add-btn').onclick = () => document.getElementById('form-section').classList.toggle('hidden');
document.getElementById('cancel-btn').onclick = () => document.getElementById('form-section').classList.add('hidden');
document.getElementById('delete-btn').onclick = () => {
    if (babyLions.length > 0) {
        babyLions.pop();
        render();
    }
};

document.getElementById('lion-form').onsubmit = (e) => {
    e.preventDefault();
    babyLions.push({
        name: document.getElementById('name').value,
        part: document.getElementById('part').value,
        tech: document.getElementById('tech').value.split(','),
        summary: document.getElementById('summary').value,
        desc: document.getElementById('desc').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        isMe: false
    });
    render();
    e.target.reset();
    document.getElementById('form-section').classList.add('hidden');
};

render();
