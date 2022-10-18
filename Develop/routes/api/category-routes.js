const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then(categoryData => {
    if (!categoryData) {
      res.status(400).json({ message: 'No categories exist!' });
      return;
    }

    res.json(categoryData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }
  }).then(categoryData => {
    if (!categoryData) {
      res.status(400).json({ message: 'No category with that id!' });
      return;
    }
    res.json(categoryData.dataValues);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => {
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({ category_name: req.body.category_name }, {
    where: {
      id: req.params.id
    }
  }).then((catData) => {
    res.json(catData);
  });

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((categoryData) => {
    res.json(categoryData)
  })
});

module.exports = router;
