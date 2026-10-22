# nostradavid.com

Site available here:

https://nostradavid.com/

## Local development

Run `direnv allow` and `just serve` to serve the static files on localhost.
Use `devenv shell` to enter the pinned Node.js 24 and Python 3.14 environment
manually. No npm dependencies or build step are required.

`just check` checks JavaScript syntax, local HTML resources, same-page anchors,
and manifest icons. It does not fetch external links or assess the content of
the unfinished starter-edition guides. `just update` updates the development
tools in the devenv lockfile.
