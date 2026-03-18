# Script para rodar npm run dev (corrige PATH do Node.js)
$nodePath = "C:\Program Files\nodejs"
if ($env:PATH -notlike "*$nodePath*") {
    $env:PATH = "$nodePath;$env:PATH"
}
npm run dev
