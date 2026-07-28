<!--
  Aegis-V2X — Task & Phase Status Ledger

  This is the single source of truth for the mission-control dashboard.
  Edit this file as work happens:
    - Flip a "Status:" line to `active` / `complete` / `planned`
    - Check off tasks as they're finished: [ ] -> [x]

  On every push to `main`, .github/workflows/update-status.yml runs
  scripts/generate_status.py, which parses this file and regenerates
  docs/status.json. The Lovable dashboard fetches that JSON directly
  from GitHub, so the site updates automatically after your next push —
  no manual JSON editing, no redeploying the dashboard.

  Metrics with no real value yet (twin_trust, edge_latency, power_watts)
  stay under `## Metrics` below as `pending` until Phase 4/6 produce
  actual measurements. Do not fabricate numbers here.
-->

## Metrics

- twin_trust: pending
- edge_latency_ms: pending
- power_watts: pending

## Phase 1 — Research & Architecture (Owner: Vaishnavi)
Status: complete

- [x] Finalize mathematical formulation
- [x] Publish architecture blueprint
- [x] Repository structure & docs

## Phase 2 — Simulation & Dataset Generation (Owner: Haridharani)
Status: active

- [X] CARLA scenario templates
- [ ] Sionna RT scene calibration
- [ ] Multimodal dataset generation pipeline
- [ ] Dataset validation report

## Phase 3 — Backend Foundation & Software Infrastructure (Owner: Logapriya)
Status: planned

- [ ] FastAPI service skeleton
- [ ] PostgreSQL schema
- [ ] REST API endpoints
- [ ] Dashboard support APIs

## Phase 4 — AI Perception & Trust Estimation (Owner: Vaishnavi)
Status: planned

- [ ] PointPillars baseline
- [ ] V2X-ViT integration
- [ ] GRU channel predictor
- [ ] Trust calibration study
- [ ] Criticality estimator

## Phase 5 — TwinTrust-AP Decision Engine (Owner: Vaishnavi)
Status: planned

- [ ] TAHS policy prototype
- [ ] FSDP policy table generation
- [ ] Joint decision integration + unit tests

## Phase 6 — Edge AI Deployment & Hardware Validation (Owner: Khushi)
Status: planned

- [ ] ONNX export pipeline
- [ ] TensorRT export pipeline
- [ ] Jetson Orin deployment
- [ ] Jetson power profiling rig

## Phase 7 — Integration, Experiments & IEEE Paper (Owner: Entire Team — Lead: Vaishnavi)
Status: planned

- [ ] End-to-end integration
- [ ] Baseline comparisons
- [ ] Ablation studies
- [ ] IEEE figure set
- [ ] Manuscript draft