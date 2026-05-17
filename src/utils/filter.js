export function getFilteredLions(lions, filterPart, sortType, searchText) {
    let result = [...lions];

    if (filterPart !== "전체") {
        result = result.filter((lion) => lion.part === filterPart);
    }

    if (searchText.trim() !== "") {
        result = result.filter((lion) =>
            lion.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    if (sortType === "이름순") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortType === "최신추가순") {
        result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
}