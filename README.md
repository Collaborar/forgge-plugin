# Forgge plugin
A modern WordPress starter plugin which uses the [Forgge](https://github.com/Collaborar/forgge) framework.

## Summary

- [Documentation](#documentation)
- [Development Team](#development-team)
- [Comparison Table](#comparison-table)
- [Features](#features)
- [Non-goals](#non-goals)
- [Requirements](#requirements)
- [Directory structure](#directory-structure)
- [Contributing](#contributing)

## Non-goals

- Taking over the WordPress main query.

  Forgge does __not__ take over the main query - it actively works with it.
- Taking over WordPress routing.

  Forgge does __not__ take over WordPress' routing - it actively works with it. The only exception to this are hardcoded URLs explicitly added by a user.
- Reinventing WordPress APIs using object-oriented interfaces.

  Forgge does not provide alternative APIs for registering post types, taxonomies or the like for little added benefit. Instead, it provides logical and handy places for developers to use core APIs.
- Using a third party engine by default.

  Forgge uses PHP by default in the same way WordPress does but with added features. Using a third party engine is entirely optional and requires installing an extension.
- Include most of Laravel or another framework.

  Forgge is lean and tuned for WordPress. While inspired by Laravel, it does not come with any `illuminate/*` packages. There are only 2 third party production dependencies:
  - `pimple/pimple` - The single-file PHP service container.
  - `guzzlehttp/psr7` - A PSR-7 Request and ServerRequest implementation.

## Requirements

- [PHP](http://php.net/) >= 5.5
- [WordPress](https://wordpress.org/) >= 4.7
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/en/) >= 12
- [Yarn](https://yarnpkg.com/en/) or NPM

## Directory structure

```
wp-content/plugins/your-plugin
├── app/
│   ├── helpers/              # Helper files, add your own here as well.
│   ├── routes/               # Register your Forgge routes.
│   │   ├── admin.php
│   │   ├── ajax.php
│   │   └── web.php
│   ├── src/                  # PSR-4 autoloaded classes.
│   │   ├── Controllers/      # Controller classes for Forgge routes.
│   │   ├── Routing/          # Register your custom routing conditions etc.
│   │   ├── View/             # Register your view composers, globals etc.
│   │   ├── WordPress/        # Register post types, taxonomies, menus etc.
│   │   └── ...
│   ├── config.php            # Forgge configuration.
│   ├── helpers.php           # Require your helper files here.
│   ├── hooks.php             # Register your actions and filters here.
│   └── version.php           # Forgge version handling.
├── dist/                     # Bundles, optimized images etc.
├── languages/                # Language files.
├── resources/
│   ├── build/                # Build process configuration.
│   ├── fonts/
│   ├── images/
│   ├── scripts/
│   │   ├── admin/            # Administration scripts.
│   │   └── frontend/         # Front-end scripts.
│   ├── styles/
│   │   ├── admin/            # Administration styles.
│   │   ├── frontend/         # Front-end styles.
│   │   └── shared/           # Shared styles.
│   └── vendor/               # Any third-party, non-npm assets.
├── vendor/                   # Composer packages.
├── views/
│   ├── layouts/
│   └── partials/
├── screenshot-1.png          # Plugin screenshot.
├── forgge                  # Forgge CLI shortcut.
├── forgge.php              # Bootstrap plugin.
└── ...
```

### Notable directories

#### `app/helpers/`

Add PHP helper files here. Helper files should include __function definitions only__. See below for information on where to put actions, filters, classes etc.

#### `app/src/`

Add PHP class files here. All clases in the `MyApp\` namespace are autoloaded in accordance with [PSR-4](http://www.php-fig.org/psr/psr-4/).

#### `resources/images/`

Add images for styling here. Optimized copies will be placed in `dist/images/` when running the build process.

#### `resources/styles/frontend/`

Add .css and .scss files to add them to the front-end bundle. Don't forget to `@import` them in `index.scss`.

#### `resources/styles/admin/`

The admin styles directory which works identically to the `resources/styles/frontend/` directory.

#### `resources/scripts/frontend/`

Add JavaScript files here to add them to the frontend bundle. The entry point is `index.js`.

#### `resources/scripts/admin/`

The admin scripts directory which works identically to the `resources/scripts/frontend/` directory.

#### `views/`

1. `views/layouts/` - Layouts that other views extend.
2. `views/partials/` - Small snippets that are meant to be reused throughout other views.
3. `views/` - Full page views that may extend layouts and may include partials.

Avoid adding any PHP logic in any of these views, unless it pertains to layouting. Business logic should go into:
- Helper files (`app/helpers/*.php`)
- Service classes
- Controllers (`app/src/Controllers`)
