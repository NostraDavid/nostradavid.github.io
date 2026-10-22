set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

default:
    @just --list --unsorted

serve port="8000":
    python3 -m http.server {{port}} --bind 127.0.0.1

check:
    python3 scripts/check_site.py
    find . -path './.devenv' -prune -o -path './.direnv' -prune -o -name '*.js' -type f -print0 | xargs -0 -r -n 1 node --check

update:
    devenv update
