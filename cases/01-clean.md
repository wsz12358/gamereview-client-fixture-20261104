# MR: Centralize combat score increment

Move the fixed attack score increment into an engine constants module. Keep attack behavior and public APIs unchanged. Scope: World and its constants only. Validation target: one keypress adds one point; existing scene cleanup and readiness tests remain enabled.
