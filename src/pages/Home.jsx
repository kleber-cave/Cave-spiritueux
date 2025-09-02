// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BouteilleCard from "../components/BouteilleCard/BouteilleCard";
import styles from "./Home.module.css";

export default function Home({ refresh }) {
  const [bouteilles, setBouteilles] = useState([]);

  const fetchBouteilles = async () => {
    const { data, error } = await supabase
      .from("bouteilles")
      .select("*")
      .order("nom", { ascending: true });
    if (!error && data) setBouteilles(data);
  };

  useEffect(() => {
    fetchBouteilles();
  }, [refresh]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Ma Cave à Spiritueux</h1>
      </header>

      <main className={styles.grid}>
        {bouteilles.length === 0 ? (
          <p className={styles.empty}>Aucune bouteille dans la cave.</p>
        ) : (
          bouteilles.map((b) => (
            <BouteilleCard key={b.id} bouteille={b} />
          ))
        )}
      </main>
    </div>
  );
}
