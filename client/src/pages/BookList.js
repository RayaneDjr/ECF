import axios from "axios";
import React, { useState } from "react";
import "../styles/BookList.css";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async (date) => {
    try {
      const selectedDate = new Date(date);
      const response = await axios.get(
        `http://localhost:3001/bookings/byDate/${selectedDate.toISOString()}`
      );
      response.data.forEach((booking) => {
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
      setBookings(response.data);
    } catch (error) {
      console.error("Unable to fetch bookings", error);
    }
  };

  const handleDate = async (e) => {
    fetchBookings(e.target.value);
    setDate(e.target.value);
  };

  const deleteBooking = (id) => {
    axios
      .delete(`http://localhost:3001/bookings/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        fetchBookings(date);
      })
      .catch((error) => console.error("Unable to delete:", error));
  };

  return (
    <div>
      <div className='box bookingListForm'>
        <h2>Liste des réservations</h2>
        <div className='inputContainer'>
          <label>Choisissez une date:</label>
          <input type='date' value={date} onChange={handleDate} />
        </div>
      </div>
      {bookings.length === 0 && (
        <div className='box'>
          <h2 className='error'>Aucune réservation</h2>
        </div>
      )}
      {bookings.map((booking) => {
        return (
          <div className='box bookingContainer'>
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

export default BookList;
