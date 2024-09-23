import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Tests() {
  const navigate = useNavigate();
  const handleback=()=>{
    navigate(-1)
  }
  return (
    <center>
            <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
      <div className='tests'>
        <div>
          <Link to="/test1">test1</Link>
          <img src="https://pngimg.com/uploads/folder/folder_PNG100476.png" alt="test1" />
        </div>
        <div>
          <Link to="/test2">test2</Link>
          <img src="https://pngimg.com/uploads/folder/folder_PNG100476.png" alt="test2" />
        </div>
        <div>
          <Link to="/test3">test3</Link>
          <img src="https://pngimg.com/uploads/folder/folder_PNG100476.png" alt="test3" /><br />
        </div>
        <div>
          <Link to="/test4">test4</Link>
          <img src="https://pngimg.com/uploads/folder/folder_PNG100476.png" alt="test4" /><br />
        </div>
      </div>
    </center>
  );
}

export default Tests;
