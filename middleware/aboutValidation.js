const { check, validationResult } = require('express-validator');

const validateAbout = [
    // Create validation
    check('title').notEmpty().withMessage('Title is required'),
    check('subtitle').notEmpty().withMessage('Subtitle is required'),
    check('description1').notEmpty().withMessage('Description 1 is required'),
    check('description2').notEmpty().withMessage('Description 2 is required'),
    check('description3').notEmpty().withMessage('Description 3 is required'),
    check('Image1').optional().isURL().withMessage('Image 1 must be a valid URL'),
    check('Image2').optional().isURL().withMessage('Image 2 must be a valid URL'),
    check('Image3').optional().isURL().withMessage('Image 3 must be a valid URL'),

    // Update validation (optional fields)
    check('title').optional().notEmpty().withMessage('Title cannot be empty'),
    check('subtitle').optional().notEmpty().withMessage('Subtitle cannot be empty'),
    check('description1').optional().notEmpty().withMessage('Description 1 cannot be empty'),
    check('description2').optional().notEmpty().withMessage('Description 2 cannot be empty'),
    check('description3').optional().notEmpty().withMessage('Description 3 cannot be empty'),
    check('Image1').optional().isURL().withMessage('Image 1 must be a valid URL'),
    check('Image2').optional().isURL().withMessage('Image 2 must be a valid URL'),
    check('Image3').optional().isURL().withMessage('Image 3 must be a valid URL'),
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateAbout,
    handleValidationErrors
};
