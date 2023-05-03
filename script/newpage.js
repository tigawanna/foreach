import fs from "fs";

const args = process.argv.slice(2);
const name = args[0];

if (!name) {
  console.error("Please specify a page name");
  process.exit(1);
}

const dir = `./src/routes/${name}`;
const file = `${dir}/index.page.tsx`;
const code = `import { Page } from "rakkasjs";

const ${name}: Page = ({}) => {
  return (
    <main className="h-full w-full flex items-center justify-center o">
      {/* Add your page content here */}
    </main>
  );
}

export default ${name}`;

fs.mkdirSync(dir);
fs.writeFileSync(file, code);

console.log(`Created directory ${dir}`);
console.log(`Created file ${file}`);
