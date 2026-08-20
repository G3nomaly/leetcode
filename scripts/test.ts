import { Glob } from "bun";

const id = Bun.argv[2];

if (!id) {
    console.error("Usage: bun test <id>");
    process.exit(1);
}

const files = [...new Glob(`src/**/${id}.*.ts`).scanSync()];

if (files.length === 0) {
    console.error(`No problem found: ${id}`);
    process.exit(1);
}

if (files.length > 1) {
    console.error(`Multiple problems found: ${id}`);
    files.forEach(file => console.error(`  ${file}`));
    process.exit(1);
}

await import(`../${files[0]!}`);