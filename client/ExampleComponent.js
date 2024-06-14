import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Enchere.css";

import usePost from "../../hooks/usePost";
import Uploadimg from "../../components/uploadimg/Uploadimg";
import { useHistory } from "react-router-dom";

function Enchere({ onSubmit, isAuction }) {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    window.location.href ="/login"
    alert("log out successfully")
  }
  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [history, token]);

  const { response, loading, postData, error } = usePost("http://127.0.0.1:3001/enchere");

  useEffect(() => {
    if (response) {
      alert(response);
    }
  }, [response]);

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    prix: "",
    dateDebut: "",
    dateFin: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token == null || !token || token == '') {
      console.log(token)
      alert("You need to log in");
    } else {
      postData(formData);

      // Réinitialiser les champs du formulaire après la soumission
      setFormData({
        titre: "",
        description: "",
        prix: "",
        dateDebut: "",
        dateFin: "",
        image: "",
      });
    }
  };

  if (!token) {
    return <div className="login">You need to log in</div>;
  }

  return (
    <div className="prep">
      {loading ? (
        <div>...loading</div>
      ) : (
        <form
          className={isAuction ? "auction-Enchere" : "article-Enchere"}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder={
              isAuction ? "Titre de l'enchère" : "Titre de l'article"
            }
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder={
              isAuction
                ? "Description de l'enchère"
                : "Description de l'article"
            }
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          {isAuction && (
            <>
              <label htmlFor="dateDebut">Date de début:</label>
              <input
                type="date"
                id="dateDebut"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                required
              />
              <label htmlFor="dateFin">Date de fin:</label>
              <input
                type="date"
                id="dateFin"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                placeholder="Prix initial"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                required
              />
            </>
          )}
          <Uploadimg
            className="auction-Enchere img"
            imgurl={formData.image}
            setImgUrl={(imageUrl) =>
              setFormData({ ...formData, image: imageUrl })
            }
          />
          <button type="submit">Créer l'enchère</button>
        </form>
      )}
      <button onClick={handleLogout} >logout</button>
    </div>
  );
}

Enchere.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isAuction: PropTypes.bool.isRequired,
};

export default Enchere;