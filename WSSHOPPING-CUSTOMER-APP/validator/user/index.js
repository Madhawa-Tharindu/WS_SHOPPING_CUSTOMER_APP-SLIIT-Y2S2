exports.userSignupValidator = (req, res, next) => {
    req.check('firstname', 'First Name is required').notEmpty();
    req.check('lastname', 'Last Name is required').notEmpty();

    req.check('email', 'Email must be between 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min: 4,
        max: 32
    });

    req.check('phoneno', 'Phone no is required').notEmpty();
    req.check('phoneno')
        .isLength({ min:10,
                    max:15
         });
    
    req.check('addressl1', 'Address line 1 is required').notEmpty();     
    req.check('addressl2', 'Address line 2 is required').notEmpty();  

    req.check('city', 'City is required').notEmpty();
    req.check('postalcode', 'Postal code is required').notEmpty();
  
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
