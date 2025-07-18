import zipfile
### this script create all the files and folders needed for the todo app in a zip file
zip_name = "todo-next-ts-structure.zip"

# Archivos y carpetas vacías a crear
files_and_dirs = [
    "components/TaskItem.tsx",
    "context/TaskContext.tsx",
    "lib/db.ts",
    "pages/api/tasks/index.ts",
    "pages/api/tasks/[id].ts",
    "pages/index.tsx",
    "prisma/schema.prisma",
    "styles/globals.css",
    "types/task.ts",
    "package.json",
    "postcss.config.js",
    "README.md",
    "tailwind.config.js",
    "tsconfig.json"
]

with zipfile.ZipFile(zip_name, 'w') as zipf:
    # Primero crear las carpetas vacías (zip no crea carpetas explícitas, pero las simula con /)
    folders = set()
    for path in files_and_dirs:
        folder = "/".join(path.split("/")[:-1])
        if folder:
            folders.add(folder + "/")
    for folder in folders:
        zipf.writestr(folder, '')  # carpeta vacía (esto la simula en zip)

    # Ahora crear archivos vacíos con su nombre
    for file in files_and_dirs:
        zipf.writestr(file, '')  # contenido vacío

print(f"✅ Archivo {zip_name} creado con la estructura vacía.")
