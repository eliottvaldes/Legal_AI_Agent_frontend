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

    const messageToSend = input; // Guardamos el mensaje
    // Agregamos el mensaje del usuario y limpiamos el input de inmediato
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: messageToSend }
    ]);
    setInput(''); // Limpieza inmediata del campo

    const payload = { message: messageToSend };

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.success) {
        const systemMessage = { sender: 'system', text: data.message };
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
    <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded" >
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