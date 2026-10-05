import type { SecurityRule } from "./types.js"
const rule001: SecurityRule = {
    id: "RULE-001",
    name: "Ignore Previous Instructions",
    category: "Instruction Override",
    pattern: /ignore\s+(previous|prior|earlier)\s+instructions/i,
    weight: 30,
    description: "Detects attempts to disregard previously provided instructions."
};
const rule002: SecurityRule = {
    id: "RULE-002",
    name: "Override System/Developer Instructions",
    category: "Instruction Override",
    pattern: /override\s+(system|developer)\s+instructions/i,
    weight: 30,
    description: "Attempts to override higher-priority instructions"
};
const rule003: SecurityRule = {
    id: "RULE-003",
    name: "System Prompt Extraction",
    category: "System Prompt Extraction",
    pattern: /(reveal|show|tell|display)\s+(your\s+)?system\s+prompt/i,
    weight: 50,
    description: "Attempts to obtain the system prompt"
};
const rule004: SecurityRule = {
    id: "RULE-004",
    name: "Developer Instruction Extraction",
    category: "System Prompt Extraction",
    pattern: /(reveal|show|tell|display)\s+(your\s+)?developer\s+instructions/i,
    weight: 50,
    description: "Attempts to obtain developer instructions"
};
const rule005: SecurityRule = {
    id: "RULE-005",
    name: "Privileged Role Manipulation",
    category: "Role Manipulation",
    pattern: /(?:act|pretend|behave)\s+(?:as|like)\s+(?:an?\s+)?(?:admin|administrator|developer|system)/i,
    weight: 20,
    description: "Detects attempts to make the model assume a privileged role."
};
const rule006: SecurityRule = {
    id: "RULE-006",
    name: "Unrestricted/Developer Mode",
    category: "Role Manipulation",
    pattern: /(?:enter|enable|activate|switch\s+to)\s+(?:developer|admin|unrestricted|jailbreak)\s+mode/i,
    weight: 25,
    description: "Detects attempts to activate an unrestricted or privileged operating mode."
};
const rule007: SecurityRule = {
    id: "RULE-007",
    name: "Security Bypass",
    category: "Security Bypass",
    pattern: /(?:bypass|circumvent|evade|get\s+around)\s+(?:the\s+)?(?:security|safety|restriction|restrictions|filter|filters|guardrails)/i,
    weight: 30,
    description: "Detects attempts to bypass security or safety restrictions."
};
const rule008: SecurityRule = {
    id: "RULE-008",
    name: "Security Control Removal",
    category: "Security Bypass",
    pattern: /(?:disable|remove|turn\s+off|deactivate)\s+(?:the\s+)?(?:security|safety|filter|filters|guardrails|protection)/i,
    weight: 30,
    description: "Detects attempts to disable or remove security controls."
};
const rule009: SecurityRule = {
    id: "RULE-009",
    name: "Credential Extraction",
    category: "Secret Extraction",
    pattern: /(?:reveal|show|provide|give|tell)\s+(?:me\s+)?(?:the\s+)?(?:password|passwords|api\s+key|api\s+keys|access\s+token|tokens|credentials)/i,
    weight: 40,
    description: "Detects attempts to obtain credentials, API keys, or access tokens."
};
const rule010: SecurityRule = {
    id: "RULE-010",
    name: "Internal Information Extraction",
    category: "Secret Extraction",
    pattern: /(?:reveal|show|provide|tell|expose)\s+(?:me\s+)?(?:your\s+)?(?:hidden|internal|private)\s+(?:information|instructions|configuration|data)/i,
    weight: 35,
    description: "Detects attempts to obtain hidden or internal information."
};
const rule011: SecurityRule = {
    id: "RULE-011",
    name: "Context Manipulation",
    category: "Context Manipulation",
    pattern: /(?:replace|rewrite|redefine|discard)\s+(?:the\s+)?(?:current|previous|existing)\s+(?:task|context|instructions)/i,
    weight: 25,
    description: "Detects attempts to replace or manipulate the current task or conversation context."
};
const rule012: SecurityRule = {
    id: "RULE-012",
    name: "Trusted Content Injection",
    category: "Instruction Injection",
    pattern: /(?:system|developer|assistant)\s*(?:message|instruction)\s*:\s*(?:ignore|follow|execute|do)/i,
    weight: 35,
    description: "Detects instructions disguised as trusted system, developer, or assistant content."
};
const rule013: SecurityRule = {
    id: "RULE-013",
    name: "Instruction Priority Manipulation",
    category: "Instruction Priority Manipulation",
    pattern: /(?:treat|consider|regard)\s+(?:my|these|this)\s+(?:instructions?|prompt)\s+as\s+(?:higher|higher[-\s]?priority|system|developer)/i,
    weight: 35,
    description: "Detects attempts to manipulate the priority or authority of instructions."
};
const rule014: SecurityRule = {
    id: "RULE-014",
    name: "Jailbreak Framing",
    category: "Jailbreak",
    pattern: /(?:hypothetical|fictional|roleplay|pretend)\s+(?:scenario|world|mode).*(?:no\s+restrictions?|without\s+(?:rules|restrictions|limits)|unrestricted)/i,
    weight: 30,
    description: "Detects framing techniques intended to remove or bypass model restrictions."
};
const rule015: SecurityRule = {
    id: "RULE-015",
    name: "Obfuscation/Evasion",
    category: "Obfuscation/Evasion",
    pattern: /(?:base64|encoded|decode|decipher)\s+(?:the\s+)?(?:following|message|text|instructions?)/i,
    weight: 25,
    description: "Detects attempts to use encoded or obfuscated instructions that may conceal malicious content."
};
export const securityRules: SecurityRule[]=[
    rule001,
    rule002,
    rule003,
    rule004,
    rule005,
    rule006,
    rule007,
    rule008,
    rule009,
    rule010,
    rule011,
    rule012,
    rule013,
    rule014,
    rule015
];