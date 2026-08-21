# CareerOps Board Pack Schema

The CareerOps board pack (`CareerOps_board_pack.json`) is the portable format for
career data that can be exported and imported between CareerOps installations.

The current board pack schema version is **5**.

Schema migrations are implemented in
`web/lib/board-pack.mjs` by `migrateV1toV2`, `migrateV2toV3`,
`migrateV3toV4`, and `migrateV4toV5`.

## Schema changelog

| Version | Changes |
| --- | --- |
| **v1** | Initial board pack format. |
| **v1 → v2** | Added `accomplishments` and `portfolio`. Added `profile.resume_struct`. Added doctrine flags including `no_auto_apply`, `no_invented_facts`, `resume_struct_canonical`, and `memory_provenance`. |
| **v2 → v3** | Added `no_auto_send`, `stories`, and `outcomes`. Added `sent_at` to roles and materials. Added `display_name` to materials and reports. |
| **v3 → v4** | Added `interview_events`. Added structured offer fields to outcomes: `base`, `bonus`, `equity_notes`, `remote`, `deadline`, and `currency`. |
| **v4 → v5** | Added profile target-band fields: `target_band_min`, `target_band_max`, and `target_band_currency`. Added role compensation fields `comp_range` and `comp_raw`. Added `contacts`. |

## Export and import

### Sample pack (fictional)

Import [`fixtures/sample-board-pack.json`](fixtures/sample-board-pack.json) from **Settings → Your data** to populate a self-host board with seeded demo roles (Acme / Northwind / Contoso). Labeled **SEEDED / FICTIONAL** — no real PII, no API keys.

Board packs are created by `buildBoardPack` and read through
`importBoardPack` in `web/lib/board-pack.mjs`.

`migrateBoardPack` upgrades older packs through each migration until they reach
the current schema version.

## Secrets and doctrine

Board packs do **not** export or import API keys, passwords, or other secret
credentials. Profile sanitization explicitly removes credential fields before
export/import.

The board pack also preserves the project's contribution doctrine, including:

- No automatic application sending (`no_auto_apply` / `no_auto_send`).
- No invented facts or experience.
- Canonical structured resume data.
- Memory provenance.

The board pack format is for portable career data, not private deployment
secrets or credentials.

## Current version

**Schema version: 5**

The current version is defined by `BOARD_PACK_SCHEMA_VERSION` in
`web/lib/board-pack.mjs`.
