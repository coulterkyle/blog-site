const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment')

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'blog_id'
})

Blogpost.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})


module.exports = { User, Blogpost, Comment };
