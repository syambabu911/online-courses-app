import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import '../cssfolder/email.css';

function Email() {
  const form = useRef();

  const submitHandler = (e) => { 
    e.preventDefault();

    emailjs.sendForm('service_gz02ffe', 'template_kp3h665', form.current, 'Ufa-22HpOROCNX4uO')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          form.current.reset(); // Reset the form fields
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className='email'>
      <form ref={form} onSubmit={submitHandler} autoComplete='off' className='form'>
        <input type="text" name="subject" placeholder='Subject' /><br />
        <input type="email" name="email" placeholder='Enter email' /><br />
        <input type="text" name="message" placeholder='Message' /><br />
        <input type="submit" value='Send' />
      </form>
    </div>
  );
}

export default Email;
