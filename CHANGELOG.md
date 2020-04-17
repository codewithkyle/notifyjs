# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.1] - 2020-04-17

### Fixed

-   toaster notification close button bug

## [1.2.0] - 2020-04-04

### Added

-   toaster notification `toast()` creation [#5](https://github.com/codewithkyle/notifyjs/issues/5)
-   renames existing notification funciton to `snackbar()`

## [1.1.0] - 2020-02-11

### Added

-   support for applying dynamic notificaiton classes [#6](https://github.com/codewithkyle/notifyjs/issues/6)
-   support for dynamic button classes
-   testing
-   generic material design based CSS stylesheet

### Deprecated

-   notifications `position` value
-   notifications `element` value

## [1.0.3] - 2020-01-09

### Fixed

-   updated type declarations

## [1.0.2] - 2020-01-09

### Added

-   `Notify.d.ts` declaration file to the `files` array in `package.json`

## [1.0.1] - 2020-01-09

### Added

-   new `notify` export providing access to a global notification manager

### Removed

-   [http-server](https://www.npmjs.com/package/http-server) dev dependency

## [1.0.0] - 2019-12-15

### Added

-   TypeScript declaration file for `Notify.js`

### Changed

-   Updated to ES2019

### Removed

-   Support for IE 11
-   Removed minimum notification duration [#2](https://github.com/codewithkyle/notifyjs/issues/2)

## [0.2.0] - 2019-09-30

### Added

-   Reworked library to use `window.requestAnimationFrame` instead of `setTimeout` in order to increase performance
-   Notifications are queued and will be displayed in the order they're submitted
-   Added positioning information/values
-   Updated HTML structure to allow for more robust layouts/designs
-   Removed the 10 second maximum notification duration

### Removed

-   Entire existing codebase due to rewrite

[unreleased]: https://github.com/codewithkyle/notifyjs/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/codewithkyle/notifyjs/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/codewithkyle/notifyjs/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/codewithkyle/notifyjs/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/codewithkyle/notifyjs/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/codewithkyle/notifyjs/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/codewithkyle/notifyjs/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/codewithkyle/notifyjs/compare/v0.1.0...v0.2.0
