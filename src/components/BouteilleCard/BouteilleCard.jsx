// src/components/BouteilleCard/BouteilleCard.jsx
import React from "react";
import styles from "./BouteilleCard.module.css";

export default function BouteilleCard({ bouteille }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{bouteille.nom}</h3>
      {bouteille.type && <p className={styles.type}>{bouteille.type}</p>}
      <p>
        {bouteille.annee ? `Année: ${bouteille.annee}` : ""}
        {bouteille.quantite ? ` • Qté: ${bouteille.quantite}` : ""}
      </p>
      {bouteille.note && <p className={styles.note}>{bouteille.note}</p>}
    </div>
  );
}