const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // find all categories
  // be sure to include its associated Products

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneCategories) {
      res.status(404).json({ message: "No category with this id!" });
    }
    res.status(200).json(oneCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    //console.log(req.body)
    const result = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.status(404).json({ message: "No category with this id!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const result= await Category.destroy({
      where: {
         id: req.params.id
         },
    })
   
      res.json(result);
   
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
