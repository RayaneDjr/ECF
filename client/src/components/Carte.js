import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Carte.css";

const Carte = () => {
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await axios.get("http://localhost:3001/dishes");

      const duplicatedCategories = Array.from(response.data, (dish) => {
        return dish.category;
      });
      const uniqueCategories = [...new Set(duplicatedCategories)];

      setCategories(uniqueCategories);
      setDishes(response.data);
    };

    const fetchMenus = async () => {
      const response = await axios.get("http://localhost:3001/menus");
      console.log(response.data);
      setMenus(response.data);
    };

    fetchDishes();
    fetchMenus();
  }, []);

  return (
    <div className='carte'>
      <h2>LA CARTE</h2>
      <h4>Menus</h4>
      {menus.map((menu) => {
        return (
          <div className='cardItem' key={menu.id}>
            <div className='haha'>
              <div>
                <span className='title'>{menu.title}</span>
                <span className='when'>{menu.when}</span>
              </div>
              <span className='description'>{menu.description}</span>
            </div>
            <div>
              <span className='price'>{menu.price}€</span>
            </div>
          </div>
        );
      })}
      {categories.map((category) => {
        return (
          <>
            <h4>{category}</h4>
            {dishes
              .filter((dish) => dish.category === category)
              .map((dish) => {
                return (
                  <div className='cardItem' key={dish.id}>
                    <div>
                      <div>
                        <span className='title'>{dish.title}</span>
                      </div>
                      <span className='description'>{dish.description}</span>
                    </div>
                    <div>
                      <span className='price'>{dish.price}€</span>
                    </div>
                  </div>
                );
              })}
          </>
        );
      })}
    </div>
  );
};

export default Carte;
