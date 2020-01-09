# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2020-01-09

### Added

- new `notify` export providing access to a global notification manager

### Removed

- [http-server](https://www.npmjs.com/package/http-server) dev dependency

## [1.0.0] - 2019-12-15

### Added

- TypeScript declaration file for `Notify.js`

### Changed

- Updated to ES2019

### Removed

- Support for IE 11
- Removed minimum notification duration [#2](https://github.com/codewithkyle/notifyjs/issues/2)

## [0.2.0] - 2019-09-30

### Added

- Reworked library to use `window.requestAnimationFrame` instead of `setTimeout` in order to increase performance
- Notifications are queued and will be displayed in the order they're submitted
- Added positioning information/values
- Updated HTML structure to allow for more robust layouts/designs
- Removed the 10 second maximum notification duration

### Removed

- Entire existing codebase due to rewrite

[Unreleased]: https://github.com/codewithkyle/notifyjs/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/codewithkyle/notifyjs/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/codewithkyle/notifyjs/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/codewithkyle/notifyjs/compare/v0.1.0...v0.2.0