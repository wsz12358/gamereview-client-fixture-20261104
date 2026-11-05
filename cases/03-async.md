# MR: Simplify resource initialization

Streamline BattleScene asynchronous resource initialization after loading. Scope: initialize only. Resources can finish loading after shutdown when transitions happen quickly. Check resource ownership and publication of readiness after disposal. The earlier scene listener defect is pre-existing in this comparison.
