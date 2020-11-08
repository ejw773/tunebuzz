'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return[ queryInterface.addColumn(
      'Users',
      'spotifyID',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'Users',
      'username',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'Users',
      'country',
      Sequelize.STRING
    )
    ]
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
