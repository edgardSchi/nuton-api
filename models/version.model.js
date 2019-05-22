const filename = '../data/versions.json'
//let versions = require(filename);
const helper = require('../helpers/helper.js');
const Version = require("./Version");


const versions = Version.find({}, null, {sort: {'id': 1}}, function (err, versions) {
	if (err) throw err;
	console.log(versions);
});


function getVersions() {
	return new Promise((resolve, reject) => {
		if (versions.length === 0) {
			reject({
				message: 'no versions available',
				status: 202
			});
		}
		resolve(versions);
	});
};

function getVersion(id) {
	return new Promise((resolve, reject) => {
		helper.mustBeInArray(versions, id).then(version => resolve(version)).catch(err => reject(err));
	});
};

function getLatestVersion() {
	console.log("ANZAHL VERSIONEN: " + typeof(versions));
	return getVersion(versions.length);
}

function insertVersion(newVersion) { };
function updateVersion(id, newVersion) { };
function deleteVersion(id) { };

module.exports = {
	insertVersion,
	getVersions,
	getVersion,
	updateVersion,
	deleteVersion,
	getLatestVersion,
}
