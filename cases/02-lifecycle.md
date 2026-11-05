# MR: Simplify battle scene shutdown

Simplify the shutdown path for battle scene input handling. Scope: BattleScene.shutdown. Expected behavior: switching scenes repeatedly must preserve exactly one attack per keypress. Review the scene exit path and external input ownership, not just syntax.
