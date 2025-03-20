import React, { useState, useEffect } from "react";
import { getData, saveData } from "./firebaseGetAndPost";
import "./App.css"; // Assurez-vous d'inclure ce fichier CSS

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    idEtudiant: "",
    name: "",
    email: "",
    auditoir: "",
    tranche1: false,
    tranche2: false,
    tranche3: false,
    enrolement1: false,
    enrolement2: false,
    enrolement3: false,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const result = await getData("qv");
    setStudents(result);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveData("qv", formData);
    fetchStudents();
  };

  return (
    <div className="container">
      {/* <h1>Gestion des Étudiants</h1> */}

      <div className="form-card">
        <h2>Ajouter un Étudiant</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID Étudiant</label>
            <input
              type="text"
              name="idEtudiant"
              value={formData.idEtudiant}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Auditoire</label>
            <input
              type="text"
              name="auditoir"
              value={formData.auditoir}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="tranche1"
                checked={formData.tranche1}
                onChange={handleChange}
              />
              Tran_1
            </label>
            <label>
              <input
                type="checkbox"
                name="tranche2"
                checked={formData.tranche2}
                onChange={handleChange}
              />
              Tran_2
            </label>
            <label>
              <input
                type="checkbox"
                name="tranche3"
                checked={formData.tranche3}
                onChange={handleChange}
              />
              Tran_3
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="enrolement1"
                checked={formData.enrolement1}
                onChange={handleChange}
              />
              Enrôl_MS
            </label>
            <label>
              <input
                type="checkbox"
                name="enrolement2"
                checked={formData.enrolement2}
                onChange={handleChange}
              />
              Enrôl_1S
            </label>
            <label>
              <input
                type="checkbox"
                name="enrolement3"
                checked={formData.enrolement3}
                onChange={handleChange}
              />
              Enrôl_2S
            </label>
          </div>

          <button type="submit">Enregistrer</button>
        </form>
      </div>

      <div className="list-container">
        <h2>Liste des Étudiants</h2>
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="student-card">
              {/* <p> {student.idEtudiant}</p> */}
              <p> {student.name}</p>
              <p> {student.email}</p>
              <p> {student.auditoir}</p>
              {/* <p><strong>Tranches Payées:</strong> {["tranche1", "tranche2", "tranche3"].filter(tranche => student[tranche]).join(", ") || "Aucune"}</p> */}
              {/* <p><strong></strong> {["enrolement1", "enrolement2", "enrolement3"].filter(enrolement => student[enrolement]).join(", ") || "Aucun"}</p> */}
            </div>
          ))
        ) : (
          <p>Aucun étudiant enregistré.</p>
        )}
      </div>
    </div>
  );
}

export default App;
