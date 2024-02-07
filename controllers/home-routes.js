const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogposts and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
    console.log(blogposts)

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogposts, 
      loggedIn: req.session.loggedIn,
      active: { home: true }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogposts/:id', async (req, res) => {
    const blogpostData = await Blogpost.findOne({
      where: {id: req.params.id},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    })
    const blogpost = blogpostData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: {blog_id: req.params.id},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    })
    const comments = commentData.map((comment) => comment.get({ plain: true }))
    
    res.render('blogpost', {
      blogpost,
      comments,
      loggedIn: req.session.loggedIn
    });
})


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedIn: true,
      active: { dashboard: true }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders register page
router.get('/register', (req, res) => {

  res.render('register', {active: { register: true }});
});


//renders login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {active: { login: true }});
});

module.exports = router;
