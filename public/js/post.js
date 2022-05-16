//create comment
const commentHandler = async (event) => {
    event.preventDefault();
  
    const message = document.querySelector('#commentMessage').value.trim();
    const post_id = document.querySelector('#post_id').value.trim();
  
    if (message) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ message, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/api/posts/${post_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  //delete comment
  const commentDelete = async (event) => {
    if (event.target.hasAttribute('data-id')) {
  
      const id = event.target.getAttribute('data-id').substring(1);
      
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    }
  };

  // make edit form visible
  const editPost = (event) => {
    event.preventDefault();

     document.querySelector("#editForm").classList.toggle('h');
    
  }

  //submit edit form to database
  const submitEdit = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#postId').value;
    const title = document.querySelector('#postTitle').value;
    const message = document.querySelector('#postMessage').value;

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

document.querySelector('#editForm').addEventListener('submit', submitEdit);

document.querySelector("#edit").addEventListener('click', editPost);
  
document.querySelector("#commentBtn").addEventListener('click', commentHandler);

document.querySelector('.comment-container').addEventListener('click', commentDelete);
