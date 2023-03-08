import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Carte.css";

const Carte = () => {
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    fetchDishes();
    fetchMenus();
  }, []);

  return (
    <div className='carte'>
      <h2>LA CARTE</h2>
      <h3>Menus</h3>
      <div className='itemsContainer'>
        {menus.map((menu) => {
          return (
            <div className='cardItem' key={menu.id}>
              <div className='left'>
                <div className='title'>{menu.title}</div>
                <div className='when'> ({menu.when})</div>
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
                        <div className='title'>{dish.title}</div>
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
