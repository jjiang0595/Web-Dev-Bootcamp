const express = require('express')
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const ExpressError = require("../utils/ExpressError");
const {campgroundSchema, reviewSchema} = require("../schemas");
const router = express.Router()
const {isLoggedIn} = require('../middleware')

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}))

router.get('/new', isLoggedIn, catchAsync(async(req, res, next)  => {
    res.render('campgrounds/new')
}))

router.post('/', isLoggedIn, validateCampground, catchAsync(async(req, res, next) => {
    if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
    const campground = new Campground(req.body.campground)
    await campground.save();
    req.flash('success', 'Successfully made a new campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async(req, res, next)  => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('authors')
    if(!campground) {
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {campground})
}))

router.get('/:id/edit', isLoggedIn, catchAsync(async(req, res, next)  => {
    const campground = await Campground.findById(req.params.id)
    if(!campground) {
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', {campground})
}))

router.put('/:id', isLoggedIn, validateCampground, catchAsync(async(req, res, next)  => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    req.flash('success', 'Successfully updated campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', isLoggedIn, catchAsync(async(req, res, next)  => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground!')
    res.redirect('/campgrounds')
}))

module.exports = router