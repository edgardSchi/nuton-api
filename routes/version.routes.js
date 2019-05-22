const express = require('express');
const router = express.Router();
const version = require('../models/version.model');
const m = require('../helpers/middlewares');

module.exports = router;

router.get('/', async (req, res) => {
	await version.getVersions()
	.then(versions => res.json(versions))
	.catch(err => {
		if (err.status) {
			res.status(err.status).json({ message: err.message});
		} else {
			res.status(500).json({ message: err.message });
		}
	});
});

router.get('/download/:id', m.mustBeInteger, async (req, res) => {
	const id = req.params.id;
	await version.getVersion(id).then(version => {
		res.download(__dirname + "/../download/" + version.path)
	});
});

router.get('/version/:id', m.mustBeInteger, async (req, res) => {
	const id = req.params.id;

	await version.getVersion(id)
	.then(version => res.json(version))
	.catch(err => {
		if(err.status) {
			res.status(err.status).json({message: err.message});
		} else {
			res.status(500).json({message: err.message});
		}
	});
});

router.get('/latestVersion', async (req, res) => {
	await version.getLatestVersion()
	.then(version => res.json(version))
	.catch(err => {
		if(err.status) {
			res.status(err.status).json({message: err.message});
		} else {
			res.status(500).json({message: err.message});
		}
	});
});
