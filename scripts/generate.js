import path from "path";
import fs from "fs";

// PAGE : bun run generate page test "(root)"
// Component : bun run generate component application/sidebar

const type = process.argv[2];
const name = process.argv[3];

if (!type || !name) {
  console.log(`
Usage:

Page:
bun run generate page dashboard "(root)"

Component:
bun run generate component navbar
`);

  process.exit();
}

// kebab-case / snake_case => PascalCase
function toPascalCase(text) {
  return text
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// kebab-case => camelCase
function toCamelCase(text) {
  const pascal = toPascalCase(text);

  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// =================
// COMPONENT
// =================

if (type === "component") {
  // آخرین بخش مسیر اسم کامپوننت است
  const componentPath = name.split("/");

  const componentNameRaw = componentPath.pop();

  const componentName = toPascalCase(componentNameRaw);

  // مسیر فولدرها
  const folder = path.join(
    "components",
    ...componentPath.map((item) => item.toLowerCase()),
    componentNameRaw.toLowerCase(),
  );

  if (fs.existsSync(folder)) {
    console.log("❌ Component already exists");
    process.exit();
  }

  fs.mkdirSync(folder, {
    recursive: true,
  });

  const content = `const ${componentName} = () => {
  return (
    <div>
      ${componentName}
    </div>
  );
};

export default ${componentName};
`;

  fs.writeFileSync(path.join(folder, `${componentName}.tsx`), content);

  console.log(`
✅ Component created

📁 ${folder}
📄 ${componentName}.tsx
`);
}
// =================
// PAGE
// =================

if (type === "page") {
  const group = process.argv[4];

  if (!group) {
    console.log("❌ Route group missing");
    process.exit();
  }

  const pageName = name.split("/").pop();

  const componentName = toPascalCase(pageName) + "Page";

  const functionName = toCamelCase(pageName) + "Page";

  const folder = path.join("app", group, ...name.split("/"));

  const file = path.join(folder, "page.tsx");

  if (fs.existsSync(file)) {
    console.log("❌ Page already exists");
    process.exit();
  }

  fs.mkdirSync(folder, {
    recursive: true,
  });

  const content = `const ${functionName} = () => {
  return (
    <div>
      ${componentName}
    </div>
  );
};

export default ${functionName};
`;

  fs.writeFileSync(file, content);

  console.log(`
✅ Page created

📁 ${folder}
📄 page.tsx
`);
}
