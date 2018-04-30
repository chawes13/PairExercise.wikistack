const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

// title, slug, content, status
const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open'
  },
});

// name and email
const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

Page.belongsTo(User, {as: 'author'});

const generateSlug = (title) => {
  const slug = title.replace(/\s+/gi, '_').replace(/\W/gi, '');

  return slug;
};

Page.beforeValidate((pageInstance) => {
  pageInstance.slug = generateSlug(pageInstance.title);
});



module.exports = {
  db,
  Page,
  User,
};
