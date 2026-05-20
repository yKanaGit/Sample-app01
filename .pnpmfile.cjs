function readPackage(pkg) {
  // Remove sharp from optionalDependencies since we use unoptimized images
  if (pkg.optionalDependencies && pkg.optionalDependencies.sharp) {
    delete pkg.optionalDependencies.sharp;
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
