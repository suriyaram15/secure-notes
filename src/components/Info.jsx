import React from 'react';

const Info = () => {
  return (
    <div className="container">
      <h2>How AES Encryption Works</h2>
      <p>
        AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used to secure sensitive data.
      </p>
      <h3>Encryption Process:</h3>
      <ul>
        <li>Your note is encrypted using a password that only you know.</li>
        <li>To view the note, you must provide the correct password to decrypt it.</li>
        <li>The AES algorithm ensures that even if someone gains access to your encrypted note, they cannot read it without the password.</li>
      </ul>
      <p>Rest assured, your notes are protected with AES encryption to keep your data safe!</p>
    </div>
  );
};

export default Info;
