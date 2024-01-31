const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment')

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.hasOne(User, {
  foreignKey: 'user_id'
})

Comment.belongsTo(Blogpost, {
  foreignKey: 'blog_id'
})

Blogpost.hasMany(Comment, {
  foreignKey: 'comment_id',
  onDelete: 'CASCADE'
})


module.exports = { User, Blogpost, Comment };
