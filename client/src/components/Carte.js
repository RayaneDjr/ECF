import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Carte.css";
import deleteIcon from "../icons/delete.svg";

const Carte = ({ enableDelete, reload }) => {
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/dishes");

      const duplicatedCategories = Array.from(response.data, (dish) => {
        return dish.category;
      });
      const uniqueCategories = [...new Set(duplicatedCategories)];

      setCategories(uniqueCategories);
      setDishes(response.data);
    } catch (error) {
      console.error("Unable to fetch dishes:", error);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/menus");
      setMenus(response.data);
    } catch (error) {
      console.error("Unable to fetch menus:", error);
    }
  };

  const deleteMenu = (id) => {
    axios
      .delete(`http://localhost:3001/menus/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => fetchMenus())
      .catch((error) => console.error("Unable to delete:", error));
  };

  const deleteDish = (id) => {
    axios
      .delete(`http://localhost:3001/dishes/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => fetchDishes())
      .catch((error) => console.error("Unable to delete:", error));
  };

  useEffect(() => {
    fetchDishes();
    fetchMenus();
  }, [reload]);

  return (
    <div className='box carte'>
      <h2>LA CARTE</h2>
      <h3>Menus</h3>
      <div className='itemsContainer'>
        {menus.map((menu) => {
          return (
            <div className='cardItem' key={menu.id}>
              <div className='left'>
                <div className='title'>
                  {menu.title}
                  {enableDelete && (
                    <img
                      src={deleteIcon}
                      alt='deleteIcon'
                      className='delete'
                      onClick={() => deleteMenu(menu.id)}></img>
                  )}
                </div>
                {menu.when && <div className='when'> ({menu.when})</div>}
                <div className='description'>{menu.description}</div>
              </div>
              <div className='price'>
                <strong>{menu.price}€</strong>
              </div>
            </div>
          );
        })}
      </div>
      {categories.map((category, index) => {
        return (
          <div key={index} className='categoryContainer'>
            <h3>{category}</h3>
            <div className='itemsContainer'>
              {dishes
                .filter((dish) => dish.category === category)
                .map((dish) => {
                  return (
                    <div className='cardItem' key={dish.id}>
                      <div className='left'>
                        <div className='title'>
                          {dish.title}
                          {enableDelete && (
                            <img
                              src={deleteIcon}
                              alt='deleteIcon'
                              className='delete'
                              onClick={() => deleteDish(dish.id)}></img>
                          )}
                        </div>
                        <div className='description'>{dish.description}</div>
                      </div>
                      <div className='price'>
                        <strong>{dish.price}€</strong>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carte;
