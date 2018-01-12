module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: DataTypes.STRING,
      done: DataTypes.BOOLEAN,
    });
  
    Task.associate = (models) => {
      models.Task.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Task;
  };