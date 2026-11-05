# Scene Lab — GameReview test repository

This repository contains a synthetic TypeScript game client with deliberately injected regressions in historical commits. It contains no employer code, interview materials, credentials or personal data. The latest main version is repaired; historical tags are test inputs, not production examples.

Requires Node.js 22.19+ and npm.

```sh
npm ci
npm test
npm run build
npm run dev
```

Open http://127.0.0.1:5180 . Press Space to increase score; transition scenes and try again. Each keypress should increase the score by one.

## GameReview comparisons

Select this repository's absolute directory in GameReview's Local Repository tab. Compare the following **tags**, not the working directory:

| Base | Head | Expected review focus |
|---|---|---|
| v0-baseline | case-01-clean | Normal change: shared constant; no injected regression |
| case-01-clean | case-02-lifecycle | Keyboard listener survives scene shutdown |
| case-02-lifecycle | case-03-async | Async asset resolves after scene disposal without cleanup/guard |
| case-03-async | case-04-contract | Producer/consumer event mismatch; UI constructs engine internals |
| case-04-contract | case-05-fixed | Repairs all injected regressions; should not report the removed bugs as new defects |

The rules-only mode should catch the newly introduced UI → engine import in case-04. Listener and async analysis require actual AI review and human verification. The baselines for case-03 and case-04 already contain earlier bugs; reviewers should report newly introduced or aggravated issues and distinguish inherited problems.

`npm test` is expected to fail at the defect tags and pass at baseline, clean and repaired tags. The regression tests stay enabled and unchanged across all six commits.

Project architecture rules are defined in `.gamereview.json`. Dependency graph extraction should include the adapter, kernel event bus, HUD consumer and runtime event definitions. See `cases/` for the description to paste for each comparison.
