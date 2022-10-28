const express = require('express')
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const router = express.Router()
const campgrounds = require('../controllers/campgrounds')
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware')
const {createCampground, renderEditForm} = require("../controllers/campgrounds");

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router