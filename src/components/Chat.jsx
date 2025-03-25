import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [alert, setAlert] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageToSend = input;
    // Agregar el mensaje del usuario y limpiar el input inmediatamente
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: messageToSend }
    ]);
    setInput(''); 

    const payload = { message: messageToSend };

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.success) {
        // Si se devuelve data, se incluye en el mensaje del sistema
        const systemMessage = { 
          sender: 'system', 
          text: data.message,
          data: (data.data && data.data.length > 0) ? data.data : null
        };
        setMessages((prev) => [...prev, systemMessage]);
      } else {
        showAlert(data.message || 'Error en la operación');
      }
    } catch (error) {
      showAlert('Error de conexión al backend');
    }
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <>
      <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded w-100">
        <div className="card-body" style={{ height: '400px', overflowY: 'auto'}}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`p-2 rounded ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}
                style={{ maxWidth: '75%' }}
              >
                {msg.text}
                {msg.data && (
                  <table className="table table-sm table-bordered mt-2 mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Estado</th>
                        <th>Descripción</th>
                        <th>Abogado</th>
                        <th>Creado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {msg.data.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.status}</td>
                          <td>{item.description}</td>
                          <td>{item.attorney}</td>
                          <td>{new Date(item.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {alert && (
          <div className="alert alert-danger m-3" role="alert">
            {alert}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;