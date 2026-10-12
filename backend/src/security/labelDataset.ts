import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

import { detectPromptInjection } from "./ruleDetector.js";

interface PromptRecord {
    [key: string]: string;
    prompt: string;
}

interface LabeledRecord {
    [key: string]: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(
    __dirname,
    "../../../../ML/dataset/prompts.csv"
);

const outputPath = path.resolve(
    __dirname,
    "../../../../ML/dataset/labeled_prompts.csv"
);

const csv = fs.readFileSync(
    inputPath,
    "utf-8"
);

const records = parse<PromptRecord>(csv, {
    columns: true,
    skip_empty_lines: true
});

const labeledRecords: LabeledRecord[] = records.map(
    (record): LabeledRecord => {

        const detection = detectPromptInjection(
            record.prompt
        );

        return {
            ...record,

            matched_rules: detection.matchedRules
                .map(rule => rule.ruleId)
                .join("|"),

            label: detection.detected
                ? "1"
                : "0"
        };
    }
);

if (labeledRecords.length === 0) {
    throw new Error(
        "No records found in dataset."
    );
}

const firstRecord = labeledRecords[0];

if (!firstRecord) {
    throw new Error(
        "First record is missing."
    );
}

const headers = Object.keys(firstRecord);

const outputCsv = [
    headers.join(","),

    ...labeledRecords.map(
        (record: LabeledRecord) =>
            headers
                .map(
                    (header: string) =>
                        `"${String(record[header]).replace(
                            /"/g,
                            '""'
                        )}"`
                )
                .join(",")
    )
].join("\n");

fs.writeFileSync(
    outputPath,
    outputCsv,
    "utf-8"
);

console.log(
    "Dataset labeling completed."
);

console.log(
    `Rows processed: ${labeledRecords.length}`
);

console.log(
    `Output: ${outputPath}`
);