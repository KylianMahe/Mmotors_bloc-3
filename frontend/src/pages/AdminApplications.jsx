import { useEffect, useState } from "react";

import { api } from "../services/api.js";

const STATUS_LABELS = {
  pending: "En attente",
  approved: "Validé",
  rejected: "Refusé",
};

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [decisionComments, setDecisionComments] = useState({});
  const [error, setError] = useState("");

  const loadApplications = () =>
    api
      .getAdminApplications()
      .then(setApplications)
      .catch((err) => setError(err.message));

  useEffect(() => {
    loadApplications();
  }, []);

  const getComment = (applicationId) => decisionComments[applicationId] || "";

  const updateComment = (applicationId, value) => {
    setDecisionComments((current) => ({
      ...current,
      [applicationId]: value,
    }));
  };

  const openApplication = async (applicationId) => {
    setError("");

    try {
      const detail = await api.getApplicationDetail(applicationId);
      setSelectedApplication(detail);
    } catch (err) {
      setError(err.message);
    }
  };

  const decide = async (applicationId, status) => {
    setError("");

    try {
      await api.updateApplicationStatus(applicationId, {
        status,
        admin_comment:
          getComment(applicationId) || (status === "approved" ? "Dossier accepté." : "Dossier incomplet."),
      });

      updateComment(applicationId, "");
      await loadApplications();

      if (selectedApplication?.id === applicationId) {
        const detail = await api.getApplicationDetail(applicationId);
        setSelectedApplication(detail);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const downloadDocument = async (documentItem) => {
    setError("");

    try {
      const blob = await api.downloadDocument(documentItem.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = documentItem.filename;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <div className="section-header">
        <div>
          <p className="eyebrow">Back-office</p>
          <h1>Dossiers clients</h1>
        </div>
      </div>

      {error && <p className="alert error">{error}</p>}

      {selectedApplication && (
        <article className="panel details-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Détail du dossier</p>
              <h2>
                Dossier #{selectedApplication.id} - {selectedApplication.vehicle_title}
              </h2>
            </div>

            <button className="button ghost" type="button" onClick={() => setSelectedApplication(null)}>
              Fermer
            </button>
          </div>

          <div className="detail-grid">
            <div>
              <strong>Client</strong>
              <p>{selectedApplication.user_email || "Non renseigné"}</p>
            </div>

            <div>
              <strong>Véhicule</strong>
              <p>{selectedApplication.vehicle_title}</p>
            </div>

            <div>
              <strong>Type</strong>
              <p>{selectedApplication.application_type === "rental" ? "Location" : "Achat"}</p>
            </div>

            <div>
              <strong>Statut</strong>
              <p>
                <span className={`status status-${selectedApplication.status}`}>
                  {STATUS_LABELS[selectedApplication.status] || selectedApplication.status}
                </span>
              </p>
            </div>
          </div>

          <div className="detail-block">
            <strong>Message du client</strong>
            <p>{selectedApplication.message || "Aucun message client."}</p>
          </div>

          <div className="detail-block">
            <strong>Documents joints</strong>

            {selectedApplication.documents.length > 0 ? (
              <ul className="document-list">
                {selectedApplication.documents.map((documentItem) => (
                  <li key={documentItem.id}>
                    <span>{documentItem.filename}</span>
                    <button className="button ghost" type="button" onClick={() => downloadDocument(documentItem)}>
                      Télécharger
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun document joint à ce dossier.</p>
            )}
          </div>

          <div className="detail-block">
            <strong>Commentaire administrateur</strong>
            <p>{selectedApplication.admin_comment || "Aucun commentaire administrateur pour le moment."}</p>
          </div>

          <div className="detail-actions">
            <input
              value={getComment(selectedApplication.id)}
              onChange={(event) => updateComment(selectedApplication.id, event.target.value)}
              placeholder="Ajouter un commentaire de décision"
            />

            <button className="button" type="button" onClick={() => decide(selectedApplication.id, "approved")}>
              Valider le dossier
            </button>

            <button className="button danger" type="button" onClick={() => decide(selectedApplication.id, "rejected")}>
              Refuser le dossier
            </button>
          </div>
        </article>
      )}

      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Véhicule</th>
              <th>Type</th>
              <th>Statut</th>
              <th>Documents</th>
              <th>Commentaire</th>
              <th>Dossier</th>
              <th>Décision</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((item) => (
              <tr key={item.id}>
                <td>{item.user_email}</td>
                <td>{item.vehicle_title}</td>
                <td>{item.application_type === "rental" ? "Location" : "Achat"}</td>
                <td>
                  <span className={`status status-${item.status}`}>
                    {STATUS_LABELS[item.status] || item.status}
                  </span>
                </td>
                <td>{item.documents.length}</td>
                <td>{item.message ? "Oui" : "Non"}</td>
                <td>
                  <button className="button ghost" type="button" onClick={() => openApplication(item.id)}>
                    Voir le dossier
                  </button>
                </td>
                <td className="table-actions">
                  <button className="button" type="button" onClick={() => decide(item.id, "approved")}>
                    Valider
                  </button>

                  <button className="button danger" type="button" onClick={() => decide(item.id, "rejected")}>
                    Refuser
                  </button>
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td colSpan="8">Aucun dossier client pour le moment.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}