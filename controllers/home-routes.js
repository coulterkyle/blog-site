const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Renders hompage and passes blogpost data
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

//Renders specific blogpost and passes comment data
router.get('/blogposts/:id', async (req, res) => {

  // Get specific blogpost and JOIN with user data
  const blogpostData = await Blogpost.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ]
  })

  // Serialize data so the template can read it
  const blogpost = blogpostData.get({ plain: true });

  // Get all related comments and JOIN with user data
  const commentData = await Comment.findAll({
    where: { blog_id: req.params.id },
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ]
  })

  // Serialize data so the template can read it
  const comments = commentData.map((comment) => comment.get({ plain: true }))

  // Pass serialized data and session flag into template
  res.render('blogpost', {
    blogpost,
    comments,
    loggedIn: req.session.loggedIn
  });
})

//Renders dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //Gets User model and joins with Blogpost
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogpost }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      ...user,
      loggedIn: req.session.loggedIn,
      active: { dashboard: true }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Renders register page
router.get('/register', (req, res) => {

  res.render('register', { active: { register: true } });
});


//Renders login page - when logged in redirects to dashboard page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', { active: { login: true } });
});

module.exports = router;
