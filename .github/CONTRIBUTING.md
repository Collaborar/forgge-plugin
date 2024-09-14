# How to contribute

Forgge Starter Plugin is completely open source and we encourage everybody to participate by:

- ⭐ the project on GitHub \([https://github.com/Collaborar/forgge-plugin](https://github.com/Collaborar/forgge-plugin)\)
- Posting bug reports \([https://github.com/Collaborar/forgge-plugin/issues](https://github.com/Collaborar/forgge-plugin/issues)\)
- Posting feature suggestions \([https://github.com/Collaborar/forgge-plugin/issues](https://github.com/Collaborar/forgge-plugin/issues)\)
- Posting and/or answering questions \([https://github.com/Collaborar/forgge-plugin/issues](https://github.com/Collaborar/forgge-plugin/issues)\)
- Submitting pull requests \([https://github.com/Collaborar/forgge-plugin/pulls](https://github.com/Collaborar/forgge-plugin/pulls)\)
- Sharing your excitement about Forgge with your community

## Development setup

1. Fork this repository.
2. Open up your `wp-content/plugins/` directory in your terminal of choice.
3. Clone your fork e.g. `git clone git@github.com:your-username/forgge-plugin.git forgge`.
4. Run `cd forgge/`.
5. Edit the `composer.json` file and add a new `repositories` key:
    ```json
    "repositories": [
      {
        "type": "git",
        "url": "https://github.com/Collaborar/forgge.git"
      },
      {
        "type": "git",
        "url": "https://github.com/Collaborar/forgge-app-core.git"
      },
      {
        "type": "git",
        "url": "https://github.com/Collaborar/forgge-cli.git"
      }
    ],
    ```
    If you have forked any of the above repositories, feel free to replace the repository url where necessary.
6. Continue editing the `composer.json` file and replace the versions of `collaborar/forgge*` packages like so:
    ```json
    "collaborar/forgge": "~0.15.1",
    "collaborar/forgge-app-core": "~0.15.1",
    "collaborar/forgge-cli": "~0.15.1",
    ```
    should be edited to
    ```json
    "collaborar/forgge": "dev-master as 0.15.1",
    "collaborar/forgge-app-core": "dev-master as 0.15.1",
    "collaborar/forgge-cli": "dev-master as 0.15.1",
    ```
    Do this for both `require` and `require-dev` packages.
6. Run `composer install && composer run post-create-project-cmd`.
7. Answer no to any questions asked during installation.
8. Ignore any `TTY mode is not supported on Windows platform.` errors.
9. Make changes to `config.json` if necessary.
10. Activate the Forgge Starter Plugin from your WordPress admin panel.

## Pull Requests

- Pull request branches MUST follow this format: `{issue-number}-{short-description}`.
  Example: `12345-fix-mobile-styles`
- Pull requests MUST target the `master` branch
- Pull requests MUST follow the current code style
