import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from '../helpers/passport';
import { sendErrorResponse, getNow } from '../helpers'
import { errorCodes, SESSION_SECRET } from '../config/constants';
import { loginValidation } from '../validations/authValidations';
import { createUser, getUser } from '../services/users';
const { INTERNAL_SERVER_ERROR } = errorCodes;

const errorResp = (res, message) => res.send({ success: false, message })

/**
 * Get logged in 
 * user's info
 * @param {*} req 
 * @param {*} res 
 */
export const info = async (req, res) => {
    try {
        const { headers, user } = req
        let userInfo = {}

        const token = headers.authorization;
        if (!!token) {
            jwt.verify(token, SESSION_SECRET, async (err, payload) => {
                if (!!payload) {
                    userInfo = user
                }
            })
        }

        return res.send({
            success: true,
            data: userInfo
        })
    } catch (error) {
        console.log("Error in logout: ", error)
        return errorResp(res, error.message)
    }
}


/**
 * SignUp User
 * @param {*} req 
 * @param {*} res 
 */
export const signUp = async (req, res) => {
    try {
        const userData = (Object.keys(req.body).length === 0) ? req.query : req.body;
        if (!userData) return sendErrorResponse(res, "Missing details", BAD_REQUEST);

        delete userData.confirm_password
        let photos = []

        console.log("requ ** ", req.files, req.photos, req.file)
        // If files found
        if (!!req.files && req.files.length > 0) {

            // Iterate files
            req.files.map(file => {

                // Get file name without extension
                const title = require('path').parse(file.originalname).name

                // Push title and path in photos
                photos.push({ path: file.path, title })
            })
        }


        console.log("joiRE userDat photos ** ", photos)
        if(photos.length > 0 ) {
            userData.photos = photos
        }
        const existingUser = await getUser({email: userData.email});
        if(existingUser) {
            return res.send({
                success: false,
                message: 'Email already exist'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);

        console.log("** userDat ", userData)
        const newUser = await createUser({
            ...userData,
            "created_at": getNow(),
            "updated_at": getNow()
        });
        return res.send({
            success: true,
            message: 'User Created Successfully',
            data: newUser
        });
    }
    catch (err) {
        const errMsg = !!err.errors ? err.errors : (!!err.message ? err.message : "Something went wrong")
        console.log("Error in signup auth controller", errMsg);
        return sendErrorResponse(res, errMsg, INTERNAL_SERVER_ERROR);
    }
}

/**
 * Login user
 * @param {*} req 
 * @param {*} res 
 */
export const login = async (req, res) => {

    // Get credentials to query or body
    const credentials = (Object.keys(req.body).length === 0) ? req.query : req.body;

    if (!credentials) // If credentials not found
        return errorResp(res, "Missing credentials, email or password")

    const joiResponse = loginValidation(credentials); // Validate request info

    if (joiResponse.error) // If validate failed
        return res.send({ success: false, error: JSON.parse(joiResponse.error.message) })

    // Authenticate user
    await passport.authenticate('auth', async (err, user, info) => {
        if (err)
            return errorResp(res, err.message)
        if (!user)
            return errorResp(res, info.errMsg)

        req.login(user, err => {
            if (err) {
                console.error("Error in loginController ", err);
                return errorResp(res, err.message)
            }
            const token = jwt.sign({ email: user.email }, SESSION_SECRET, {
                expiresIn: '24h'
            })

            return res.send({
                success: true,
                data: user, token,
                message: "Logged in successfully"
            });
        });
    })(req, res);
};


/**
 * Logout current user
 * and destroy session
 * @param {*} req 
 * @param {*} res 
 */
export const logout = async (req, res) => {
    try {
        const { guest_token } = req;

        req.logout();
        req.session.destroy();

        // TODO: Update user info here
        // await updateOrder({
        //     "user_id": null,
        //     "email": null,
        //     "updated_at": getNow(),
        //     "last_ip_address": req.clientIp
        // }, { "guest_token": guest_token });

        return res.send({
            "success": true,
            "message": "You have been successfully logged out"
        });
    }
    catch (err) {
        console.log("Error in logout: ", err)
        return sendErrorResponse(res, err.message, INTERNAL_SERVER_ERROR);
    }
}