import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./KPI.module.css";

export default function KPI() {
  const [kpis, setKpis] = useState({
    totalBottles: 0,
    averageABV: 0,
    totalAlcoholInLiters: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("bouteilles").select("*");

      if (!error && data) {
        const totalBottles = data.length;

        const bottlesWithABV = data.filter(
          (b) => b["ABV (%)"] != null
        );
        const averageABV =
          bottlesWithABV.length > 0
            ? bottlesWithABV.reduce((acc, b) => acc + b["ABV (%)"], 0) /
              bottlesWithABV.length
            : 0;

        const bottlesWithQuantity = data.filter(
          (b) => b["Quantite (cL)"] != null
        );
        const totalAlcoholInLiters =
          bottlesWithQuantity.reduce((acc, b) => acc + b["Quantite (cL)"], 0) /
          100;

        setKpis({
          totalBottles,
          averageABV: averageABV.toFixed(2),
          totalAlcoholInLiters: totalAlcoholInLiters.toFixed(2),
        });
      }
      setLoading(false);
    };

    fetchKPIs();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
      </header>
      <main className={styles.grid}>
        {loading ? (
          <p>Chargement des données...</p>
        ) : (
          <>
            <div className={styles.kpiCard}>
              <h2>Bouteilles</h2>
              <p className={styles.kpiValue}>{kpis.totalBottles}</p>
              <p className={styles.kpiUnit}>Total</p>
            </div>
            <div className={styles.kpiCard}>
              <h2>Degré Moyen</h2>
              <p className={styles.kpiValue}>{kpis.averageABV}%</p>
              <p className={styles.kpiUnit}>ABV</p>
            </div>
            <div className={styles.kpiCard}>
              <h2>Volume d'Alcool</h2>
              <p className={styles.kpiValue}>{kpis.totalAlcoholInLiters}</p>
              <p className={styles.kpiUnit}>Litres</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
