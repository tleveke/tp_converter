'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Accounts', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Accounts', 'userId')
  }
};
