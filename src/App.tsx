import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import AddAppointmentForm from './Components/AddAppointmentForm';
import AppointmentTable from './Components/AppointmentTable';

const App: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7069/notificationHub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.start()
      .then(() => {
        console.log('Conectado a SignalR');

        // Suscribirse a la notificación de nueva cita
        connection.on('ReceiveNotification', (message) => {
          console.log('Notificación recibida de SignalR:', message);
          // Actualizar la lista de citas después de recibir una notificación
          fetchAppointments();
        });
      })
      .catch(err => console.error('Error al conectar a SignalR:', err));

    return () => {
      connection.stop();
    };
  }, []);

  // Función para obtener las citas desde la API
  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://localhost:7069/api/Appointment');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  // Función para manejar la eliminación de una cita
  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://localhost:7069/api/Appointment/${id}`, {
        method: 'DELETE',
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error al eliminar cita:', error);
    }
  };

  // Función para manejar la adición de una nueva cita
  const handleAdd = async (newAppointment: any) => {
    try {
      await fetch('https://localhost:7069/api/Appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });
      fetchAppointments();
      setShowForm(false); // Cerrar el modal después de agregar una cita
    } catch (error) {
      console.error('Error al agregar cita:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-4 text-center">Gestión de Citas</h1>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        Agregar Nueva Cita
      </button>
      
      {/* Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full relative">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <AddAppointmentForm onAdd={handleAdd} />
          </div>
        </div>
      )}

      <AppointmentTable appointments={appointments} onDelete={handleDelete} />
    </div>
  );
};

export default App;
