const fs = require('fs')

const getNewId = (array) => {
	if (array.length > 0) {
		return array[array.length - 1].id + 1;
	} else {
		return 1;
	}
}

const newDate = () => new Date().toString();

function mustBeInArray(array, id) {
	return new Promise((resolve, reject) => {
		const row = findById(array, id);
		if (!row) {
			reject({
				message: 'ID is not good',
				status: 404
			})
		}
		resolve(row);
	})
}

function findById(source, id) {
	for (var i = 0; i < source.length; i++) {
	  if (source[i].id === id) {
		return source[i];
	  }
	}
	throw "Couldn't find object with id: " + id;
  }

function writeJSONFile(filename, content) {
	fs.writeFileSync(filename, JSON.stringify(content), 'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	})
}

module.exports = {
	getNewId,
	newDate,
	mustBeInArray,
	writeJSONFile
}
