const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: {
      model: Product,
      // be sure to include its associated Product data
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(TagData => {
    if(!TagData) {
      res.status(404).json({message: "No tags"});
      return;
    }
    res.json(TagData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      // be sure to include its associated Product data
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(TagData => {
    if(!TagData) {
      res.status(404).json({message: "No tags found with id"});
      return;
    }
    res.json(TagData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(TagData => {
    if(!TagData) {
      res.status(404).json({message: "No tags created"});
      return;
    }
    res.json(TagData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(TagData => {
    if(!TagData) {
      res.status(404).json({message: "No tags found with id"});
      return;
    }
    res.json(TagData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(TagData => {
    if(!TagData) {
      res.status(404).json({message: "No tags found with id"});
      return;
    }
    res.json(TagData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

module.exports = router;
