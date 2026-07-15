# AgentCert External Smoke

[![AgentCert external smoke](https://github.com/Kakarottoooo/agentcert-external-smoke/actions/workflows/agentcert.yml/badge.svg)](https://github.com/Kakarottoooo/agentcert-external-smoke/actions/workflows/agentcert.yml)

This independent repository proves that a repository with no AgentCert source
checkout can run the public Tripwire action, produce an evidence bundle, and
optionally upload that bundle to the hosted AgentCert control plane.

The fixture is deterministic and local-only. It does not use an LLM API key or
connect to a real business system.

## What CI proves

1. `Kakarottoooo/agentcert/actions/tripwire@v0` runs from an external repository.
2. A Playwright browser agent is evaluated against six reproducible faults.
3. JUnit, HTML, screenshots, traces, a badge, and AgentCert evidence are uploaded as a workflow artifact.
4. When repository credentials are configured, `agentcert@0.2.2 connect` validates and saves a CI connection before the public package uploads evidence to the hosted control plane.

Run the workflow from the Actions tab or push to `main`.
