module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recipients', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    complement: {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: true,
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: false,
    },
    cep: {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('users'),
};
