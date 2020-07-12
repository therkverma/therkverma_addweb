import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUser, getUserById } from '../services/users';

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    let user = await getUserById(id)
    if (user) {
        user.isAdmin = true
        done(null, user);
    }
    else
        done(user.errors, null);
});

passport.use('auth', new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    async (req, email, password, done) => {
        try {

            // Get User with requested email
            const existingUser = await getUser({ email });
            if (!existingUser)
                return done(null, false, { errMsg: "Email does not exist" });

            // Match password
            const verified = bcrypt.compareSync(password, existingUser.password);
            if (!verified) {
                return done(null, false, { errMsg: "Invalid username or password" });
            } else {

                // Fetch user after update
                const user = await getUser({ email });
                return done(null, user);
            }
        }
        catch (err) {
            console.log("Error in Auth strategy", err.message);
            return done(err, false)
        }
    }
))

export default passport;
