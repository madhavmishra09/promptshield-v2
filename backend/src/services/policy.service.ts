import type {
    PolicyInput,
    PolicyResult
} from "../security/types.js";

import policyEngine from "../security/policyEngine.js";

export default function policyService(
    input: PolicyInput
): PolicyResult {

    return policyEngine(input);
}