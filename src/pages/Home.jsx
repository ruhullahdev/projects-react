const name = "Ruhullah";

function Home() {
  return (
    <section>
      <div className="bg-blue-800 my-3 mx-10 rounded-xl py-20 px-6">
        <h1 className="text-semibold text-slate-300 text-xl">Welcome Back!</h1>

        <div className="">
          {name.split("").map((letter, index) => (
            <span className="text-4xl font-bold text-white" key={index}>{letter}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
