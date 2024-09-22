import React from 'react';

interface Appointment {
  id: number;
  description: string;
  date: string;
  customerName: string;
  serviceId: number;
}

interface AppointmentTableProps {
  appointments: Appointment[];
  onDelete: (id: number) => void;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments, onDelete }) => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Customer Name</th>
            <th className="py-2 px-4 border-b text-left">Service ID</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment: Appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-left">{appointment.description}</td>
              <td className="py-2 px-4 border-b text-left">{new Date(appointment.date).toLocaleString()}</td>
              <td className="py-2 px-4 border-b text-left">{appointment.customerName}</td>
              <td className="py-2 px-4 border-b text-left">{appointment.serviceId}</td>
              <td className="py-2 px-4 border-b text-left">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  onClick={() => onDelete(appointment.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
