# MR: Restore lifecycle, event contract and architecture boundaries

Restore scene listener cleanup, dispose late-loaded assets, preserve the published readiness event contract and use GameClient as the HUD's sole engine access path. Scope: BattleScene, HUD and event definition. Re-run unchanged regression tests. Do not report the removed defects as still present without evidence in the head revision.
