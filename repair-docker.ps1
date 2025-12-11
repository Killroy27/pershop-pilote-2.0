<#
repair-docker.ps1
Script PowerShell pour diagnostiquer et réparer une image Docker corrompue.
Usage:
  - Exécution interactive : .\repair-docker.ps1
  - Exécution non-interactive : .\repair-docker.ps1 -Force
#>

param(
    [switch]$Force
)

function Run-ExitOnError($cmd) {
    Write-Host "Running: $cmd" -ForegroundColor Cyan
    $res = & powershell -Command $cmd 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Command failed (exit $LASTEXITCODE): $cmd" -ForegroundColor Red
        Write-Host $res
        throw "Aborting due to error"
    }
    return $res
}

Write-Host "Vérification de la présence de Docker..." -ForegroundColor Yellow
try {
    docker version --format '{{.Server.Version}}' > $null 2>&1
} catch {
    Write-Host "Docker ne répond pas. Assurez-vous que Docker Desktop est lancé." -ForegroundColor Red
    exit 1
}

Write-Host "Liste des images Docker (quelques-unes) :" -ForegroundColor Green
docker images --format 'table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}' | Select-Object -First 20

$targetRef = 'pershop-pilote-mvp1-frontend'
$foundIds = docker images --filter=reference="$targetRef" --format '{{.Repository}}:{{.Tag}} {{.ID}}' | ForEach-Object { $_ }

if (-not $foundIds) {
    Write-Host "Aucune image nommée '$targetRef' trouvée localement." -ForegroundColor Yellow
} else {
    Write-Host "Images trouvées pour '$targetRef':" -ForegroundColor Green
    $foundIds | ForEach-Object { Write-Host "  $_" }

    if (-not $Force) {
        $answer = Read-Host "Supprimer ces images et nettoyer le builder ? (o/N)"
        if ($answer -ne 'o' -and $answer -ne 'O') {
            Write-Host "Opération annulée par l'utilisateur." -ForegroundColor Yellow
            exit 0
        }
    }

    Write-Host "Suppression des images trouvées..." -ForegroundColor Cyan
    # Supprimer toutes les images correspondant au filtre
    $ids = docker images --filter=reference="$targetRef" --format '{{.ID}}'
    foreach ($id in $ids) {
        Write-Host "docker image rm $id" -ForegroundColor Cyan
        docker image rm $id
    }
}

Write-Host "Purge du cache du builder Docker (safe) ..." -ForegroundColor Cyan
try {
    docker builder prune -af
} catch {
    Write-Host "Échec de 'docker builder prune' — ignorer." -ForegroundColor Yellow
}

Write-Host "Purge buildx (si installé) ..." -ForegroundColor Cyan
try {
    docker buildx prune --all --force
} catch {
    Write-Host "'docker buildx' non disponible ou erreur — ignorer." -ForegroundColor Yellow
}

Write-Host "Reconstruire sans cache (cela peut prendre du temps)..." -ForegroundColor Cyan
# Utilise docker-compose local dans le dossier courant
try {
    docker-compose build --no-cache --progress=plain
} catch {
    Write-Host "Erreur lors de docker-compose build." -ForegroundColor Red
    exit 1
}

Write-Host "Lancement des services (attach)..." -ForegroundColor Cyan
try {
    docker-compose up --build
} catch {
    Write-Host "Erreur lors de docker-compose up." -ForegroundColor Red
    exit 1
}
