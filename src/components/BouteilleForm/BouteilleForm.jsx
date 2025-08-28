import { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient";
import { useToast } from "../Toast/ToastContext";
import styles from "./BouteilleForm.module.css";

export default function BouteilleForm({ onAdd, onClose }) {
  const [nom, setNom] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [annee, setAnnee] = useState("");
  const [note, setNote] = useState("");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const comboboxRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchTypes();
    const onDocClick = (e) => {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  async function fetchTypes() {
    const { data, error } = await supabase.from("types").select("nom").order("nom");
    if (!error && data) setTypes(data.map(t => t.nom));
  }

  const filteredTypes = type.trim() === "" ? types : types.filter(t => t.toLowerCase().includes(type.trim().toLowerCase()));

  const handleSelectType = (t) => { setType(t); setShowDropdown(false); };

  const handleAddNewType = async (candidate) => {
    const trimmed = candidate.trim();
    if (!trimmed) return;
    setShowDropdown(false);
    setType(trimmed);
    if (types.includes(trimmed)) return;

    const { data, error } = await supabase.from("types").insert([{ nom: trimmed }]).select();
    if (!error && data?.length) {
      setTypes(prev => [...prev, trimmed].sort());
      showToast(`Type "${trimmed}" ajouté !`, "success");
    } else {
      showToast(`Erreur lors de l'ajout du type`, "error");
      await fetchTypes();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalType = type.trim();
    if (finalType && !types.includes(finalType)) {
      await handleAddNewType(finalType);
    }

    const { error } = await supabase.from("bouteilles").insert([
      { nom: nom.trim(), quantite: Number(quantite)||1, annee: annee ? Number(annee) : null, note: note.trim() || null, type: finalType || null }
    ]);

    if (!error) {
      showToast(`Bouteille "${nom}" ajoutée !`, "success");
      onAdd && onAdd();
      onClose();
    } else {
      showToast("Erreur lors de l'ajout de la bouteille", "error");
      console.error(error);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <form className={styles.modalContent} onSubmit={handleSubmit} autoComplete="off">
        <h2>Ajouter une bouteille</h2>

        <label>Nom</label>
        <input className={styles.inputField} type="text" value={nom} onChange={e => setNom(e.target.value)} required placeholder="Ex: Plantation Original Dark" />

        <label>Type</label>
        <div className={styles.combobox} ref={comboboxRef}>
          <input className={styles.inputField} type="text" value={type} placeholder="Ex: rhum, whisky..." onChange={e => { setType(e.target.value); setShowDropdown(true); }} onFocus={() => setShowDropdown(true)} />
          {showDropdown && (
            <div className={styles.dropdown}>
              {filteredTypes.map((t,i) => <div key={i} className={styles.dropdownItem} onClick={() => handleSelectType(t)}>{t}</div>)}
              {type.trim() !== "" && !types.some(x => x.toLowerCase()===type.trim().toLowerCase()) && (
                <div className={`${styles.dropdownItem} ${styles.addNew}`} onClick={() => handleAddNewType(type)}>+ Ajouter "{type.trim()}"</div>
              )}
            </div>
          )}
        </div>

        <label>Quantité</label>
        <input className={styles.inputField} type="number" min="1" value={quantite} onChange={e => setQuantite(e.target.value)} />

        <label>Année</label>
        <input className={styles.inputField} type="number" placeholder="ex: 1998" value={annee} onChange={e => setAnnee(e.target.value)} />

        <label>Note</label>
        <input className={styles.inputField} type="text" placeholder="ex: Excellent, à garder..." value={note} onChange={e => setNote(e.target.value)} />

        <div className={styles.formActions}>
          <button type="button" onClick={onClose} className={styles.btnCancel}>Annuler</button>
          <button type="submit" className={styles.btnSubmit}>Ajouter</button>
        </div>
      </form>
    </div>
  );
}
