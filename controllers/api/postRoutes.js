const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [User],
          attributes: [ 'id', 'message', 'date_created'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [[Comment, 'date_created', 'desc']]
    });

    const post = postData.get({ plain: true });
    
    res.render('posts', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
   Post.update(
    {
      title: req.body.title,
      message: req.body.message
    },
    {
      returning: true, where: { id: req.params.id }
    }
  )  
  .then((updatedPost) => {
    // Sends the updated book as a json response
    res.json(updatedPost);
  })
  .catch((err) => res.json(err));
 
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
