const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await UserActivation.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    const token = jwt.sign({ userId: user._id}, 'your-secret-key', {
                        expiresIn: '1h',
                    });
                    return done(null, user, { token });
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error)
    }
});

app.use(passport.initialize());

app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    res.json({ user: req.user, token: req.user.token });
});