function App() {
  return (
    <>
      <header className="header">
        <h1>
          Count Down <span>Timer</span>
        </h1>
      </header>
      <section className="form-container">
        <form className="form">
          <input type="date" name="date" id="date" />
          <button>Start Timer</button>
        </form>
      </section>
    </>
  );
}

export default App;
