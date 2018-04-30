const express = require('express');
const { Page, User } = require('../models');
const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');
const mainPage = require('../views/main');
const editPage = require('../views/editPage');
const layout = require('../views/layout');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const pagesData = await Page.findAll();
    res.send(mainPage(pagesData));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  // Add a new post then redirect
  try {
    const [userInstance, created] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    });

    const page = new Page({
      title: req.body.title,
      content: req.body.content
    });

    page.setAuthor(userInstance);

    const pageData = await page.save();
    console.log('Page Successfully Created\n', pageData.dataValues);
    res.redirect(`/wiki/${pageData.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res) => {
  // Add a new page form and redirect to /slug
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const pageInstance = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    if (pageInstance) {
      const author = await pageInstance.getAuthor();
      res.send(wikipage(pageInstance, author));
    } else {
      res.status(404).send(layout('Sorry, this page could not be found'));
    }

  } catch (error) {
    next(error);
  }
});

router.post('/:slug', async (req, res, next) => {
  try {
    const [numUpdatedPages, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug,
      },
    });
    console.log(`Successfully updated ${numUpdatedPages}`);
    res.redirect(`/wiki/${req.params.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/delete', async (req, res, next) => {
  try {
    const numDeletedRows = await Page.destroy({
      where: {
        slug: req.params.slug,
      },
    });
    console.log(`Successfully deleted ${numDeletedRows} page`);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const pageInstance = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    const author = await pageInstance.getAuthor();

    res.send(editPage(pageInstance, author));

  } catch (error) {
    next(error);
  }
});

module.exports = router;
