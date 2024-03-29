const router = require('express').Router();
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');


//Create new blogpost
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update blogpost
router.put('/:id', withAuth, async (req, res) => {
  try {
  const updateBlogpost = await Blogpost.update(
    {
      ...req.body,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    }
    )
    res.status(200).json(updateBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});


//Delete blogpost
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
