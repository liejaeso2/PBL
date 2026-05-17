import { useLions } from "./hooks/useLions.js";
import ControlPanel from "./components/ControlPanel.jsx";
import AsyncPanel from "./components/AsyncPanel.jsx";
import ViewOptions from "./components/ViewOptions.jsx";
import AddLionForm from "./components/AddLionForm.jsx";
import LionCardList from "./components/LionCardList.jsx";
import LionDetailList from "./components/LionDetailList.jsx";

function App() {
  const {
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
  } = useLions();

  return (
    <div className="app">
      <header className="top-area">
        <h1>아기 사자 명단</h1>

        <ControlPanel
          count={lions.length}
          isFormOpen={isFormOpen}
          onToggleForm={toggleForm}
          onDeleteLastLion={deleteLastLion}
        />

        <AsyncPanel
          status={status}
          message={message}
          isLoading={isLoading}
          canRetry={canRetry}
          onAddRandomOne={addRandomOne}
          onAddRandomFive={addRandomFive}
          onRefreshAll={refreshAll}
          onRetry={retryRequest}
        />

        <ViewOptions
          filterPart={filterPart}
          sortType={sortType}
          searchText={searchText}
          onChangeFilterPart={changeFilterPart}
          onChangeSortType={changeSortType}
          onChangeSearchText={changeSearchText}
        />

        {isFormOpen && (
          <AddLionForm
            form={form}
            isLoading={isLoading}
            onChangeForm={changeForm}
            onSubmitForm={submitForm}
            onFillRandomForm={fillRandomForm}
          />
        )}
      </header>

      <main>
        <section className="card-area">
          <h2>아기 사자 자기소개 요약 카드</h2>
          <LionCardList lions={visibleLions} />
        </section>

        <section className="detail-area">
          <h2>상세 자기소개 정보</h2>
          <LionDetailList lions={visibleLions} />
        </section>
      </main>
    </div>
  );
}

export default App;