// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BouteilleCard from "../components/BouteilleCard/BouteilleCard";
import BouteilleForm from "../components/BouteilleForm/BouteilleForm";
import styles from "./Home.module.css";

export default function Home() {
  const [bouteilles, setBouteilles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchBouteilles = async () => {
    const { data, error } = await supabase
      .from("bouteilles")
      .select("*")
      .order("nom", { ascending: true });
    if (!error && data) setBouteilles(data);
  };

  useEffect(() => {
    fetchBouteilles();
  }, []);

  const handleAdd = () => {
    fetchBouteilles();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Ma Cave à Spiritueux</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          + Ajouter une bouteille
        </button>
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

      {showForm && (
        <div className="modalBackdrop">
          <div className="modalContent">
            <BouteilleForm
              onAdd={() => { handleAdd(); setShowForm(false); }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}