#!/usr/bin/env node
/**
 * Ensures docs/fixtures/sample-board-pack.json is a real v5 pack that imports roles.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  importBoardPack,
  planBoardPackUpsert,
  BOARD_PACK_SCHEMA_VERSION,
} from '../web/lib/board-pack.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixturePath = path.join(root, 'docs/fixtures/sample-board-pack.json')

assert.ok(fs.existsSync(fixturePath), 'docs/fixtures/sample-board-pack.json must exist')
const raw = JSON.parse(fs.readFileSync(fixturePath, 'utf8'))
assert.equal(raw.schema_version, BOARD_PACK_SCHEMA_VERSION)
assert.equal(raw.format, `careerops-board-pack/v${BOARD_PACK_SCHEMA_VERSION}`)
const blob = JSON.stringify(raw)
assert.doesNotMatch(blob, /openai_key|anthropic_key|api_key|sk-/i)

const imported = importBoardPack(raw)
assert.ok(imported.roles.length >= 3, 'fixture must include demo roles')
assert.ok(imported.accomplishments.length >= 1)
const plan = planBoardPackUpsert(imported, {
  existingRoleIds: [],
  existingReportIds: [],
  existingAccomplishmentIds: [],
  existingPortfolioIds: [],
  existingContactIds: [],
})
assert.ok(plan.roles.insert.length >= 3)
assert.match(imported.stories || '', /FICTIONAL|SEEDED|Acme/i)

console.log('ok  sample board pack fixture imports roles (no secrets)')
console.log('\ntest-sample-board-pack passed')
