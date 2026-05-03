document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://randomuser.me/api/?results=";

    const toggleFormBtn = document.getElementById("toggleFormBtn");
    const closeFormBtn = document.getElementById("closeFormBtn");
    const removeLastBtn = document.getElementById("removeLastBtn");

    const addRandomOneBtn = document.getElementById("addRandomOneBtn");
    const addRandomFiveBtn = document.getElementById("addRandomFiveBtn");
    const refreshAllBtn = document.getElementById("refreshAllBtn");
    const fillRandomBtn = document.getElementById("fillRandomBtn");
    const retryBtn = document.getElementById("retryBtn");

    const totalCount = document.getElementById("totalCount");
    const visibleCount = document.getElementById("visibleCount");
    const asyncStatus = document.getElementById("asyncStatus");

    const partFilter = document.getElementById("partFilter");
    const sortSelect = document.getElementById("sortSelect");
    const searchInput = document.getElementById("searchInput");

    const formPanel = document.getElementById("formPanel");
    const lionForm = document.getElementById("lionForm");

    const nameInput = document.getElementById("nameInput");
    const partInput = document.getElementById("partInput");
    const skillInput = document.getElementById("skillInput");
    const gradeInput = document.getElementById("gradeInput");
    const summaryInput = document.getElementById("summaryInput");
    const introInput = document.getElementById("introInput");
    const emailInput = document.getElementById("emailInput");
    const phoneInput = document.getElementById("phoneInput");
    const websiteInput = document.getElementById("websiteInput");
    const commentInput = document.getElementById("commentInput");
    const avatarInput = document.getElementById("avatarInput");

    const cardList = document.getElementById("cardList");
    const detailList = document.getElementById("detailList");

    let lions = [];
    let isLoading = false;
    let lastRequest = null;
    let statusTimer = null;

    const partList = ["Frontend", "Backend", "Design"];
    const skillList = ["JavaScript", "HTML/CSS", "React", "Node.js", "Figma", "Spring", "SQL"];

    const summaryList = [
        "웹 개발 기초를 성실하게 쌓고 있는 아기 사자입니다.",
        "비동기 처리와 데이터 흐름을 공부하고 있습니다.",
        "사용자에게 필요한 화면을 만드는 것을 좋아합니다.",
        "서버와 API 구조를 이해하기 위해 노력하고 있습니다.",
        "필터와 검색 기능 구현을 직접 해보는 중입니다."
    ];

    const introList = [
        "실습과 프로젝트를 통해 기능을 구현해 보며 웹 개발 역량을 키우고 있습니다.",
        "데이터가 어떻게 들어오고 화면이 어떻게 갱신되는지 흐름을 이해하는 데 집중하고 있습니다.",
        "작은 기능이라도 구조를 생각하면서 구현하려고 노력하고 있습니다.",
        "외부 API 데이터를 가공해 화면에 맞게 보여주는 과정을 배우고 있습니다.",
        "사용자 입력과 서버 응답에 따라 UI가 바뀌는 구조를 익히는 중입니다."
    ];

    const commentList = [
        "같이 성장해요!",
        "한 단계씩 차근차근.",
        "꾸준히 해보겠습니다.",
        "기초를 탄탄히 쌓는 중입니다.",
        "오늘도 한 칸 전진!"
    ];

    initFromHTML();
    render();

    toggleFormBtn.addEventListener("click", function () {
        formPanel.classList.toggle("hidden");
    });

    closeFormBtn.addEventListener("click", function () {
        formPanel.classList.add("hidden");
    });

    removeLastBtn.addEventListener("click", function () {
        if (lions.length === 0) {
            alert("삭제할 아기 사자가 없습니다.");
            return;
        }

        for (let i = lions.length - 1; i >= 0; i--) {
            if (!lions[i].isFixed) {
                lions.splice(i, 1);
                render();
                return;
            }
        }

        alert("내 카드만 남아 있어 삭제하지 않았습니다.");
    });

    addRandomOneBtn.addEventListener("click", function () {
        runAsync(async function () {
            const newLions = await fetchRandomLions(1);
            lions = lions.concat(newLions);
            render();
            return "랜덤 1명 추가 완료";
        });
    });

    addRandomFiveBtn.addEventListener("click", function () {
        runAsync(async function () {
            const newLions = await fetchRandomLions(5);
            lions = lions.concat(newLions);
            render();
            return "랜덤 5명 추가 완료";
        });
    });

    refreshAllBtn.addEventListener("click", function () {
        runAsync(async function () {
            const fixedLions = lions.filter(function (lion) {
                return lion.isFixed;
            });

            const currentCount = lions.length;
            const requestCount = currentCount - fixedLions.length;

            const newLions = await fetchRandomLions(requestCount);
            lions = fixedLions.concat(newLions);

            render();
            return "전체 새로고침 완료";
        });
    });

    fillRandomBtn.addEventListener("click", function () {
        runAsync(async function () {
            const randomLions = await fetchRandomLions(1);
            fillForm(randomLions[0]);
            return "랜덤 값 채우기 완료";
        });
    });

    retryBtn.addEventListener("click", function () {
        if (lastRequest !== null) {
            runAsync(lastRequest, true);
        }
    });

    partFilter.addEventListener("change", render);
    sortSelect.addEventListener("change", render);
    searchInput.addEventListener("input", render);

    lionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newLion = {
            id: makeId(),
            name: nameInput.value.trim(),
            part: partInput.value,
            skill: skillInput.value.trim(),
            grade: Number(gradeInput.value),
            summary: summaryInput.value.trim(),
            intro: introInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            website: websiteInput.value.trim(),
            comment: commentInput.value.trim(),
            avatar: avatarInput.value.trim(),
            createdAt: Date.now(),
            isFixed: false
        };

        lions.push(newLion);
        lionForm.reset();
        avatarInput.value = "";
        formPanel.classList.add("hidden");
        render();
    });

    function initFromHTML() {
        const cardElements = document.querySelectorAll("[data-lion-card]");

        lions = Array.from(cardElements).map(function (card, index) {
            return {
                id: card.dataset.id,
                name: card.dataset.name,
                part: card.dataset.part,
                skill: card.dataset.skill,
                grade: Number(card.dataset.grade),
                summary: card.dataset.summary,
                intro: card.dataset.intro,
                email: card.dataset.email,
                phone: card.dataset.phone,
                website: card.dataset.website,
                comment: card.dataset.comment,
                avatar: card.dataset.avatar,
                createdAt: Date.now() - index * 1000,
                isFixed: card.dataset.fixed === "true"
            };
        });
    }

    async function runAsync(requestFunction, isRetry) {
        if (isLoading) {
            return;
        }

        if (!isRetry) {
            lastRequest = requestFunction;
        }

        try {
            isLoading = true;
            setAsyncButtonsDisabled(true);
            retryBtn.classList.add("hidden");
            setStatus("loading", "불러오는 중...");

            const successMessage = await requestFunction();

            setStatus("success", successMessage || "완료!");

            clearTimeout(statusTimer);
            statusTimer = setTimeout(function () {
                setStatus("ready", "준비 완료");
            }, 1200);
        } catch (error) {
            console.error(error);
            setStatus("fail", "불러오기 실패");
            retryBtn.classList.remove("hidden");
        } finally {
            isLoading = false;
            setAsyncButtonsDisabled(false);
        }
    }

    async function fetchRandomLions(count) {
        if (count <= 0) {
            return [];
        }

        const response = await fetch(API_URL + count + "&nat=us,gb,ca,au,nz");

        if (!response.ok) {
            throw new Error("네트워크 응답 오류");
        }

        const data = await response.json();

        if (!data.results) {
            throw new Error("응답 데이터 오류");
        }

        return data.results.map(function (user, index) {
            return convertUserToLion(user, index);
        });
    }

    function convertUserToLion(user, index) {
        const name = user.name.first;
        const part = pickRandom(partList);
        const skill = pickRandom(skillList);
        const grade = randomNumber(1, 4);
        const summary = pickRandom(summaryList);
        const intro = pickRandom(introList);
        const comment = pickRandom(commentList);

        let website = "https://example.com";

        if (user.login && user.login.username) {
            website = "https://" + user.login.username.toLowerCase() + ".portfolio.com";
        }

        return {
            id: makeId(),
            name: name,
            part: part,
            skill: skill,
            grade: grade,
            summary: summary,
            intro: intro,
            email: user.email || "lion@example.com",
            phone: user.phone || "010-0000-0000",
            website: website,
            comment: comment,
            avatar: user.picture && user.picture.large ? user.picture.large : "",
            createdAt: Date.now() + index,
            isFixed: false
        };
    }

    function fillForm(lion) {
        nameInput.value = lion.name;
        partInput.value = lion.part;
        skillInput.value = lion.skill;
        gradeInput.value = String(lion.grade);
        summaryInput.value = lion.summary;
        introInput.value = lion.intro;
        emailInput.value = lion.email;
        phoneInput.value = lion.phone;
        websiteInput.value = lion.website;
        commentInput.value = lion.comment;
        avatarInput.value = lion.avatar;

        formPanel.classList.remove("hidden");
    }

    function render() {
        const visibleLions = getVisibleLions();

        totalCount.textContent = "총 " + lions.length + "명";
        visibleCount.textContent = "현재 표시: " + visibleLions.length + "명";

        renderCards(visibleLions);
        renderDetails(visibleLions);
    }

    function getVisibleLions() {
        const selectedPart = partFilter.value;
        const keyword = searchInput.value.trim().toLowerCase();

        let result = lions.filter(function (lion) {
            const partMatched = selectedPart === "all" || lion.part === selectedPart;
            const nameMatched = lion.name.toLowerCase().includes(keyword);

            return partMatched && nameMatched;
        });

        if (sortSelect.value === "name") {
            result.sort(function (a, b) {
                return a.name.localeCompare(b.name, "ko");
            });
        } else {
            result.sort(function (a, b) {
                return b.createdAt - a.createdAt;
            });
        }

        return result;
    }

    function renderCards(list) {
        cardList.innerHTML = "";

        if (list.length === 0) {
            cardList.innerHTML = '<div class="empty-box">표시할 아기 사자가 없습니다. 필터/검색 조건을 확인해 주세요.</div>';
            return;
        }

        list.forEach(function (lion) {
            const card = document.createElement("article");
            card.className = "lion-card";

            const imageHTML = lion.avatar
                ? '<img src="' + escapeHTML(lion.avatar) + '" alt="' + escapeHTML(lion.name) + '" />'
                : '<div class="no-image">' + escapeHTML(lion.name.charAt(0)) + '</div>';

            card.innerHTML =
                '<div class="card-image-box">' +
                imageHTML +
                '<span class="skill-badge">' + escapeHTML(lion.skill) + '</span>' +
                (lion.isFixed ? '<span class="mine-badge">내 카드</span>' : '') +
                '</div>' +
                '<div class="card-content">' +
                '<h3>' + escapeHTML(lion.name) + ' 아기사자</h3>' +
                '<p class="part-name">' + escapeHTML(lion.part) + '</p>' +
                '<p>' + escapeHTML(lion.summary) + '</p>' +
                '</div>';

            cardList.appendChild(card);
        });
    }

    function renderDetails(list) {
        detailList.innerHTML = "";

        if (list.length === 0) {
            detailList.innerHTML = '<div class="empty-box">표시할 아기 사자가 없습니다. 필터/검색 조건을 확인해 주세요.</div>';
            return;
        }

        list.forEach(function (lion) {
            const detail = document.createElement("article");
            detail.className = "detail-card";

            detail.innerHTML =
                '<h3>' + escapeHTML(lion.name) + ' 아기사자</h3>' +
                '<div class="detail-part">' + escapeHTML(lion.part) + '</div>' +
                '<div class="detail-info">학년: ' + escapeHTML(String(lion.grade)) + '학년 / 관심 기술: ' + escapeHTML(lion.skill) + '</div>' +

                '<div class="detail-label">자기소개</div>' +
                '<p>' + escapeHTML(lion.intro) + '</p>' +

                '<div class="detail-label">연락처</div>' +
                '<ul>' +
                '<li>이메일: ' + escapeHTML(lion.email) + '</li>' +
                '<li>전화번호: ' + escapeHTML(lion.phone) + '</li>' +
                '<li>웹사이트: ' + escapeHTML(lion.website || '-') + '</li>' +
                '</ul>' +

                '<div class="detail-label">한 마디</div>' +
                '<p>' + escapeHTML(lion.comment || '-') + '</p>';

            detailList.appendChild(detail);
        });
    }

    function setStatus(type, message) {
        asyncStatus.className = "status-text " + type;
        asyncStatus.textContent = message;
    }

    function setAsyncButtonsDisabled(disabled) {
        const buttons = document.querySelectorAll(".async-btn");

        buttons.forEach(function (button) {
            button.disabled = disabled;
        });
    }

    function pickRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makeId() {
        return "lion-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});