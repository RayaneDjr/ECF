import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/BookList.css";
import { useNavigate, useParams } from "react-router-dom";

const MyBookings = () => {
  const { UserId } = useParams();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const deleteBooking = (id) => {
    axios
      .delete(`http://localhost:3001/bookings/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        fetchBookings(UserId);
      })
      .catch((error) => console.error("Unable to delete:", error));
  };

  const fetchBookings = async (UserId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/bookings/byUserId/${UserId}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      const check = (date) => {
        const today = new Date();
        const bookingDate = new Date(date);
        if (bookingDate >= today) {
          return true;
        } else return false;
      };

      const data = response.data.filter((booking) => check(booking.date));

      data.forEach((booking) => {
        const bookingDate = new Date(booking.date);
        const bookingTime = new Date(`2020-01-01T${booking.time}`);
        if (bookingTime.getMinutes() !== 0) {
          booking.time =
            bookingTime.getHours() + "h" + bookingTime.getMinutes();
        } else {
          booking.time = bookingTime.getHours() + "h";
        }
        booking.date = bookingDate.toLocaleDateString();
      });
      setBookings(data);
    } catch (error) {
      console.error("Unable to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings(UserId);
  }, [UserId]);

  return (
    <div>
      {bookings.map((booking) => {
        return (
          <div className='box bookingContainer' key={booking.id}>
            <div className='bookingItem'>
              <label>Prénom:</label>
              <span> {booking.firstname}</span>
            </div>

            <div className='bookingItem'>
              <label>Nom:</label>
              <span> {booking.lastname}</span>
            </div>

            <div className='bookingItem'>
              <label>Email:</label>
              <span> {booking.email}</span>
            </div>

            <div className='bookingItem'>
              <label>Date:</label>
              <span> {booking.date}</span>
            </div>

            <div className='bookingItem'>
              <label>Heure:</label>
              <span> {booking.time}</span>
            </div>

            <div className='bookingItem'>
              <label>Nombre d'invités:</label>
              <span> {booking.guests}</span>
            </div>

            <div className='bookingItem'>
              <label>Allergies:</label>
              {booking.allergies ? (
                <span> {booking.allergies}</span>
              ) : (
                <span>Aucun</span>
              )}
            </div>

            <div className='buttonsContainer'>
              <button
                type='button'
                className='submit'
                onClick={() => navigate(`/changeBooking/${booking.id}`)}>
                Modifier
              </button>
              <button
                type='button'
                className='submit'
                onClick={() => deleteBooking(booking.id)}>
                Supprimer
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
