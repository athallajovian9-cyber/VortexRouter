import test from "node:test";
import assert from "node:assert/strict";
import { hyperCompress, optimizeMessages } from "./server.js";

test("hyperCompress strips conversational bloat and polite preambles", () => {
  const raw = "Sure! I would be happy to help. In order to solve this:\n\n\nconsole.log(1);\n\nLet me know if you need anything else!";
  const comp = hyperCompress(raw, true);

  assert.ok(!comp.includes("Sure!"));
  assert.ok(!comp.includes("I would be happy to help"));
  assert.ok(!comp.includes("In order to"));
  assert.ok(!comp.includes("Let me know if you need anything else!"));
  assert.ok(comp.length < raw.length);
});

test("optimizeMessages deduplicates repetitive system prompts across turns", () => {
  const messages = [
    { role: "system", content: "You are a coding assistant." },
    { role: "system", content: "You are a coding assistant." },
    { role: "user", content: "Fix the bug." }
  ];

  const result = optimizeMessages(messages);
  assert.equal(result.length, 2);
  assert.equal(result[0].role, "system");
  assert.equal(result[1].role, "user");
});
