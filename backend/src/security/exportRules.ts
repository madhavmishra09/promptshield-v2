import {securityRules} from "./rules.js";

const rules= securityRules.map((rule)=>({
     id: rule.id,
     name: rule.name,
     category: rule.category,
     pattern: rule.pattern.source,
     flags: rule.pattern.flags,
     weight: rule.weight,
     description: rule.description
}));

console.log(JSON.stringify(rules));
