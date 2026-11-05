# ai/

Exe AI: produces each wallet's Signal Score and detection flag from behaviour, for the engine in `../engine`.
The engine (Master Doc Revision 010.6) is not changed by anything in this folder.

- `SPEC.md`: the specification (start here).
- `harness.py`: feeds any scorer into the engine's nine stress scenarios and reports gates G1-G7.
  `python3 ai/harness.py` prints the baseline (assumed scores) and the naive scorer.
- `test_harness.py`: `cd ai && python3 -m pytest -q`. Checks the baseline reproduces `engine/outputs/demo_data.json`.
- `baseline.json`: written by `harness.py`; the baseline every scorer is judged against.

Every output is simulated unless marked otherwise.
