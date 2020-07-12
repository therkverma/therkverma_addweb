import { User } from '../helpers/database';
import { getNow } from '../helpers';

export const getUser = async query => {
    return await User.findOne({ where: query })
        .catch(err => {
            throw err
        });
};

export const getUserById = async id => {
    return await User.findByPk(id)
        .catch(err => {
            throw err
        });
};

export const createUser = async query => {
    return await User.create(query)
        .catch(err => {
            throw err
        });
};


export const getUsers = async (query) => await User.findAndCountAll(query);

export const deleteUser = async query => await User.update({"deleted_at":getNow()},{ where: query });
