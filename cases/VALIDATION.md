# Recorded fixture validation

The same four regression tests were executed at each stage. Failures in historical cases are deliberate and should be reproduced, not excluded.

| Tag | Passed | Failed | Observed result |
|---|---:|---:|---|
| v0-baseline | 4 | 0 | Correct baseline |
| case-01-clean | 4 | 0 | No behavioral regression |
| case-02-lifecycle | 3 | 1 | After transition, one keypress adds 2 instead of 1 |
| case-03-async | 2 | 2 | Earlier listener failure plus late resource not disposed |
| case-04-contract | 0 | 4 | Earlier failures plus HUD stays loading and reads a separate world |
| case-05-fixed | 4 | 0 | All deliberately injected regressions repaired |

Baseline and final fixed versions also pass TypeScript checking and Vite production build. No real AI model output is claimed by this fixture validation. GameReview's deterministic architecture rule is expected to report the new UI → engine import at case-04; lifecycle and contract findings require separate review.
