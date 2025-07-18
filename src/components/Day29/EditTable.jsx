import React, { useRef, useState } from 'react';

const EditTable = () => {
  const [tableData, settableData] = useState([]);
  const [showForm, setshowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setformData] = useState({
    name: '',
    role: '',
    email: ''
  });

  const formRef = useRef();

  const inputClass = `w-full bg-gray-200 focus:outline-0 focus:ring-1 focus:ring-teal-400 py-2.5 rounded-lg px-3`;
  const labelClass = 'text-sm text-gray-900';
  const divClass = `flex flex-col gap-2`;

  const handleInputChaneg = (e) => {
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, role, email } = formData;
    if (!name || !role || !email) {
      alert('All fields are required!');
      return;
    }

    if (isEditing) {
      // Update logic
      const updated = tableData.map((item) =>
        item.id === editId ? { ...item, name, role, email } : item
      );
      settableData(updated);
      setIsEditing(false);
      setEditId(null);
    } else {
      const obj = { name, role, email, id: Date.now() };
      settableData((prev) => [...prev, obj]);
    }

    setformData({ name: '', role: '', email: '' });
    setshowForm(false);
  };

  const handleDelete = (id) => {
    const filtered = tableData.filter((item) => item.id !== id);
    settableData(filtered);
  };

  const handleEdit = (item) => {
    setformData({ name: item.name, role: item.role, email: item.email });
    setIsEditing(true);
    setEditId(item.id);
    setshowForm(true);
  };

  return (
    <div>
      <div className='w-[80%] border-b py-3 px-5 flex justify-between mx-auto'>
        <h2 className='text-lg font-semibold'>Editable Table</h2>
        <button
          onClick={() => {
            setshowForm((prev) => !prev);
            if (!showForm) {
              setIsEditing(false);
              setformData({ name: '', role: '', email: '' });
            }
          }}
          className='h-5 w-5 border rounded-full flex justify-center items-center'
        >
          +
        </button>
      </div>

      <div
        ref={formRef}
        style={{
          maxHeight: showForm ? `${formRef.current?.scrollHeight}px` : 0
        }}
        className='overflow-hidden transition-all duration-200'
      >
        <form
          onSubmit={handleSubmitForm}
          className='mx-auto w-[80%] shadow-md shadow-gray-400 my-4 rounded-lg px-5 py-2 space-y-4'
        >
          <div className={divClass}>
            <label className={labelClass} htmlFor='name'>
              Name
            </label>
            <input
              onChange={handleInputChaneg}
              value={formData.name}
              name='name'
              className={inputClass}
              type='text'
              placeholder='Enter your name'
            />
          </div>
          <div className={divClass}>
            <label className={labelClass} htmlFor='email'>
              Email
            </label>
            <input
              onChange={handleInputChaneg}
              value={formData.email}
              name='email'
              className={inputClass}
              type='email'
              placeholder='Enter your email'
            />
          </div>
          <div className={divClass}>
            <label className={labelClass} htmlFor='role'>
              Role
            </label>
            <input
              onChange={handleInputChaneg}
              value={formData.role}
              name='role'
              className={inputClass}
              type='text'
              placeholder='Enter your role'
            />
          </div>

          <button
            type='submit'
            className='border px-5 py-1.5 rounded-lg bg-gray-600 text-white font-semibold'
          >
            {isEditing ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>

      {tableData.length > 0 ? (
        <div className='w-[80%] mx-auto mt-6 overflow-x-auto'>
          <table className='w-full border border-collapse text-left'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Email</th>
                <th className='border px-4 py-2'>Role</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, i) => (
                <tr key={item.id}>
                  <td className='border px-4 py-2'>{item.name}</td>
                  <td className='border px-4 py-2'>{item.email}</td>
                  <td className='border px-4 py-2'>{item.role}</td>
                  <td className='border px-4 py-2 space-x-2'>
                    <button
                      onClick={() => handleEdit(item)}
                      className='text-blue-600 font-medium'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className='text-red-600 font-medium'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-center my-20'>
          <h2 className='text-2xl font-semibold'>No table data found</h2>
        </div>
      )}
    </div>
  );
};

export default EditTable;
