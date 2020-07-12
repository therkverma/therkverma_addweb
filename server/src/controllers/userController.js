import { Op } from 'sequelize';
import { sendErrorResponse } from '../helpers'
import { getUsers, getUser } from '../services/users';
import { errorCodes, PER_PAGE } from '../config/constants';
const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = errorCodes;


/**
 * Get Users records
 * @param {*} req 
 * @param {*} res 
 */
export const get = async (req, res) => {
    try {
        const { id, search, page } = req.query;
        const query = {
            deleted_at: null
        }

        if (!!id) {
            query.id = id
            const user = await getUser(query);
            if (!user) return sendErrorResponse(res, "No user found", UNPROCESSABLE_ENTITY);

            return res.send({
                'success': true,
                data: user
            });
        } else {
            if (!!search) { // If search found
                query.email = {
                    [Op.like]: `${search}%`
                }
            }

            const offset = ((!!page ? page : 1) - 1) * PER_PAGE
            const fullQuery = {}

            if (Object.keys(query).length > 0) {
                fullQuery.where = query
            }
            fullQuery.limit = PER_PAGE
            fullQuery.offset = offset

            const users = await getUsers(fullQuery);
            return res.send({
                'success': true,
                ...users
            });
        }
    }
    catch (err) {
        console.log("Error in get user controller", err);
        return sendErrorResponse(res, !!err.message ? err.message : "Something went wrong", INTERNAL_SERVER_ERROR);
    }
}
