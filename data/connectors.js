import Sequelize from 'sequelize';
import secrets from './secrets';

const db = new Sequelize('magento_birchbox', secrets.USERNAME, secrets.PASSWORD)
