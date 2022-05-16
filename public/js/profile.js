let clicked = 0;


// const openEdit = async (event) => {
//    event.preventDefault();

//    const id = event.target.getAttribute('data-id').substring(1);

   
//    const title = document.querySelector('#title').value.trim();
//    const message = document.querySelector('#message').value.trim();
//    const bodyInp = document.querySelector(".ePost");

//    if(eclick % 2 === 0) {
    
//     bodyInp.classList.add("pEdit");
//     bodyInp.innerHTML = `<input type="text" id="editTitle" value="${title}" name="editTitle" />
//     <input class="form-input" type="text" id="editMessage" value="${message}" name="editMessage" />
//     <button id="edit" type="submit" class="btn btn-primary" data-id="${id}">Submit</button>`;

//    } else {

//     bodyInp.innerHTML = '';
//     bodyInp.classList.remove("pEdit")
    
//    }
   
//   eclick++
// }


const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#postName').value.trim();
  const message = document.querySelector('#postMessage').value.trim();

  if (title && message) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const editPost = async (event) => {
  event.preventDefault();


  const btn = document.getElementById("edit");
  const id = btn.getAttribute('data-id');
  const title = document.querySelector("#editTitle").value.trim();
  const message = document.querySelector("#editMessage").value.trim();


      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/api/posts/${id}`);
      } else {
        alert('Failed to update post')
      }
}



const buttonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id').substring(1);
    
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};




document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.del')
  .addEventListener('click', buttonHandler);

// document
//   .querySelector('#containerPost')
//   .addEventListener('click', openEdit);

// document.querySelector('.ePost').addEventListener('submit', editPost);


