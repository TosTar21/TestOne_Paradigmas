import React, { useState } from 'react';

interface AddAppointmentFormProps {
  onAdd: (appointment: {
    description: string;
    date: string;
    customerName: string;
    serviceId: number;
  }) => void;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [serviceId, setServiceId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      description,
      date,
      customerName,
      serviceId: parseInt(serviceId, 10),
    });
    setDescription('');
    setDate('');
    setCustomerName('');
    setServiceId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Date:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Service ID:</label>
        <input
          type="number"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Appointment
      </button>
    </form>
  );
};

export default AddAppointmentForm;
