const fs = require('fs');
const Git = require('nodegit');
const path = require('path');
const argv = require('yargs').argv

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

if (argv.f === undefined) {
	var projects = ['WMS/server', 'Seraphin', 'indexer', 'Catalog', 'business-core', 'knuckle'];
} else {
	var projects = [argv.f];
}

var handleFolder = function(project, folderName, targetFolder)
{
	var fullPath = targetFolder + folderName;

	Git.Repository
		.open(fullPath)
		.then(function(repository) {
			repository
				.getStatusExt()
				.then(function(files) {
					for (var index in files) {
						var file = files[index];

						console.log(project + '::' + folderName + ' - ' + file.status() + ' : ' + file.path());
					}
				});
		});
}

var handleProject = function(project)
{
	var targetFolder = '../' + projects[projectIndex] + '/vendor/erp/';
	var folders = dirs(targetFolder);

	for (var index in folders) {
		handleFolder(project, folders[index], targetFolder);
	}
}

for (var projectIndex in projects) {
	handleProject(projects[projectIndex]);
}
