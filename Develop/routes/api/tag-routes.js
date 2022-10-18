const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then(tagData => {
    if (!tagData) {
      res.status(400).json({ message: 'No tag exist!' });
      return;
    }

    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(400).json({ message: 'No tag with that id!' });
      return;
    }
    res.json(tagData.dataValues);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData => {
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, {
    where: {
      id: req.params.id
    }
  }).then((tagData) => {
    res.json(tagData);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.findOne({
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(400).json({ message: 'No tag with that id!' });
      return;
    }
    tagData.destroy()
    res.json({ message: 'Tag deleted!' });
  });
});

module.exports = router;
