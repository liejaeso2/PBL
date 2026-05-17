import { useEffect, useState } from "react";
import { initialLions } from "../data/lions.js";
import {
    fetchRandomLions,
    makeEmptyForm,
    makeLionFromForm
} from "../utils/api.js";
import { getFilteredLions } from "../utils/filter.js";

export function useLions() {
    const [lions, setLions] = useState(initialLions);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState(makeEmptyForm());

    const [filterPart, setFilterPart] = useState("전체");
    const [sortType, setSortType] = useState("최신추가순");
    const [searchText, setSearchText] = useState("");

    const [status, setStatus] = useState("ready");
    const [message, setMessage] = useState("준비 완료");

    const [request, setRequest] = useState(null);
    const [lastRequest, setLastRequest] = useState(null);

    const visibleLions = getFilteredLions(
        lions,
        filterPart,
        sortType,
        searchText
    );

    const isLoading = status === "loading";
    const canRetry = status === "error" && lastRequest !== null;

    useEffect(() => {
        if (request === null) {
            return;
        }

        async function loadData() {
            setStatus("loading");
            setMessage("불러오는 중...");

            try {
                if (request.type === "add") {
                    const newLions = await fetchRandomLions(request.count);
                    setLions((prev) => [...prev, ...newLions]);
                }

                if (request.type === "refresh") {
                    const newLions = await fetchRandomLions(5);
                    setLions(newLions);
                }

                if (request.type === "fillForm") {
                    const newLions = await fetchRandomLions(1);
                    const lion = newLions[0];

                    setForm({
                        name: lion.name,
                        part: lion.part,
                        phone: lion.phone,
                        email: lion.email,
                        image: lion.image,
                        intro: lion.intro,
                        detail: lion.detail
                    });

                    setIsFormOpen(true);
                }

                setStatus("ready");
                setMessage("준비 완료");
            } catch (error) {
                setStatus("error");
                setMessage(error.message || "요청에 실패했습니다.");
            } finally {
                setRequest(null);
            }
        }

        loadData();
    }, [request]);

    const startRequest = (nextRequest) => {
        setLastRequest(nextRequest);
        setRequest({
            ...nextRequest,
            requestTime: Date.now()
        });
    };

    const toggleForm = () => {
        setIsFormOpen((prev) => !prev);
    };

    const deleteLastLion = () => {
        setLions((prev) => prev.slice(0, prev.length - 1));
    };

    const changeForm = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const submitForm = (event) => {
        event.preventDefault();

        if (form.name.trim() === "") {
            setStatus("error");
            setMessage("이름을 입력해야 합니다.");
            setLastRequest(null);
            return;
        }

        const newLion = makeLionFromForm(form);

        setLions((prev) => [...prev, newLion]);
        setForm(makeEmptyForm());
        setIsFormOpen(false);
        setStatus("ready");
        setMessage("준비 완료");
    };

    const changeFilterPart = (event) => {
        setFilterPart(event.target.value);
    };

    const changeSortType = (event) => {
        setSortType(event.target.value);
    };

    const changeSearchText = (event) => {
        setSearchText(event.target.value);
    };

    const addRandomOne = () => {
        startRequest({
            type: "add",
            count: 1
        });
    };

    const addRandomFive = () => {
        startRequest({
            type: "add",
            count: 5
        });
    };

    const refreshAll = () => {
        startRequest({
            type: "refresh"
        });
    };

    const fillRandomForm = () => {
        startRequest({
            type: "fillForm"
        });
    };

    const retryRequest = () => {
        if (lastRequest !== null) {
            startRequest(lastRequest);
        }
    };

    return {
        lions,
        visibleLions,
        isFormOpen,
        form,
        filterPart,
        sortType,
        searchText,
        status,
        message,
        isLoading,
        canRetry,
        toggleForm,
        deleteLastLion,
        changeForm,
        submitForm,
        changeFilterPart,
        changeSortType,
        changeSearchText,
        addRandomOne,
        addRandomFive,
        refreshAll,
        fillRandomForm,
        retryRequest
    };
}