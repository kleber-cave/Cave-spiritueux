// src/components/BouteilleCard/BouteilleCard.jsx
import React from "react";
import styles from "./BouteilleCard.module.css";

export default function BouteilleCard({ bouteille }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{bouteille.Nom}</h3>
      {bouteille.Type && <p className={styles.type}>{bouteille.Type}</p>}
      <p>
        {bouteille["ABV (%)"] ? `ABV: ${bouteille["ABV (%)"]}%` : ""}
        {bouteille["Quantite (cL)"]
          ? ` • ${bouteille["Quantite (cL)"]} cL`
          : ""}
      </p>
      {bouteille.note && <p className={styles.note}>{bouteille.note}</p>}
    </div>
  );
}
