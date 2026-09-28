import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Country.module.css";

function Country() {
  const [countryName, setCountryName] = useState("Canada");
  const [formInputValue, setFormInputValue] = useState("Canada");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [countryFlagData, setCountryFlagData] = useState(null);

  // To fetch the flag image of the country
  useEffect(() => {
    if (!countryData) {
      return;
    }

    const getFlag = async (countryData) => {
      try {
        const iso = countryData[0].iso2;
        const flagResponse = await fetch(
          `https://api.api-ninjas.com/v1/countryflag?country=${encodeURIComponent(iso)}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": "cFe8jNfsLwSI0pyiZCU7LowyHmkycPHGHYsOLAnw",
              "Content-Type": "application/json",
            },
          },
        );

        if (!flagResponse.ok) {
          console.log(`Error Flag`);
          return;
        }

        const flagData = await flagResponse.json();
        setCountryFlagData(flagData);
      } catch (error) {
        setError(`Error! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getFlag(countryData);
  }, [countryData]);

  // To fetch the the facts and data about the country
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setMessage("Loading... Please Waite...");
        const response = await fetch(
          `https://api.api-ninjas.com/v1/country?name=${encodeURIComponent(countryName)}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": "cFe8jNfsLwSI0pyiZCU7LowyHmkycPHGHYsOLAnw",
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          console.log(`Error! Status code: ${response.status}`);
          return;
        }

        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        setError(`Error! ${error.message}`);
      }
    };
    getData();
  }, [countryName]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setCountryName(formInputValue);
  };

  return (
    <>
      <header className={styles.header}>
        <Link to="/projects" className={styles.backLink}>
          ← Back to Projects
        </Link>
        <h2 className={styles.title}>Country API</h2>
      </header>

      <main className={styles.page}>
        <section className={styles.searchPanel}>
          <p className={styles.kicker}>Atlas / 01</p>
          <h1 className={styles.heading}>
            Find the story <br />
            <span>behind a country.</span>
          </h1>
          <p className={styles.intro}>
            Explore the numbers, people, and places that shape nations around
            the world.
          </p>
          <form className={styles.searchForm} onSubmit={handleFormSubmit}>
            <input
              className={styles.searchInput}
              value={formInputValue}
              onChange={(event) => setFormInputValue(event.target.value)}
              placeholder="Search for a country..."
            />
            <button className={styles.searchButton} type="submit">
              Go <span aria-hidden="true">↗</span>
            </button>
          </form>
          {isLoading && <p className={styles.status}>{message}</p>}
          {error.length > 0? <p>{error}</p> : ""}
          <div className={styles.panelRule} />
          <p className={styles.panelNote}>Live data from API Ninjas</p>
        </section>

        <section className={styles.dashboard}>
          <div className={styles.heroCard}>
            <aside className={styles.identity}>
              <p className={styles.kicker}>Country profile</p>
              <h2 className={styles.countryName}>
                {countryData && countryData[0].name}
              </h2>
              <p className={styles.capital}>
                {countryData && countryData[0].capital}
              </p>
            </aside>
            {countryFlagData && (
              <img
                className={styles.flag}
                src={countryFlagData.rectangle_image_url}
                alt={`${countryData[0].name} flag`}
              />
            )}
            <div className={styles.currencyBadge}>
              <span>Currency</span>
              {countryData && countryData[0].currency.code}
            </div>
          </div>

          <div className={styles.quickFacts}>
            <div className={styles.factBox}>
              <span>Population</span>
              <strong>{countryData && countryData[0].population}</strong>
            </div>
            <div className={styles.factBox}>
              <span>Land area</span>
              <strong>{countryData && countryData[0].surface_area} km²</strong>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h3>
                Economic Strength & <br /> Living Standards
              </h3>
              <p>Gdp: {countryData && countryData[0].gdp}</p>
              <p>Gdp Growth: {countryData && countryData[0].gdp_growth}</p>
              <p>
                Gdp Per Capita: {countryData && countryData[0].gdp_per_capita}
              </p>
            </div>
            <div className={styles.metricCard}>
              <h3>
                Workforce Structure <br /> (Economic Drivers)
              </h3>
              <p>
                Service Sector:{" "}
                {countryData && countryData[0].employment_services}
              </p>
              <p>
                Industrial Sector:{" "}
                {countryData && countryData[0].employment_industry}
              </p>
              <p>
                Agrarian Sector:{" "}
                {countryData && countryData[0].employment_agriculture}
              </p>
            </div>
            <div className={`${styles.metricCard} ${styles.socialCard}`}>
              <h3>Quality of Life & Social Development</h3>
              <p>
                Average Female Life Expectancy:{" "}
                {countryData && countryData[0].life_expectancy_female}
              </p>
              <p>
                Average Male Life Expectancy:{" "}
                {countryData && countryData[0].life_expectancy_male}
              </p>
              <p>
                Homicide Rate: {countryData && countryData[0].homicide_rate}
              </p>
              <p>
                Urban Population:{" "}
                {countryData && countryData[0].urban_population}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Country;
