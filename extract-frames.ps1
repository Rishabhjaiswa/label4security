$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ZipsDir = Split-Path -Parent $ProjectRoot
$PublicFrames = Join-Path $ProjectRoot "public\frames"

Write-Host "[*] Matrix Tags - Frame Extraction Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$zipMappings = @(
  @{ File = "hologram_stick.zip"; Folder = "hologram" },
  @{ File = "shrink.zip"; Folder = "shrink" },
  @{ File = "dome_sticker.zip"; Folder = "dome" }
)

foreach ($mapping in $zipMappings) {
  $zipPath = Join-Path $ZipsDir $mapping.File
  $outputDir = Join-Path $PublicFrames $mapping.Folder

  Write-Host "Processing: $($mapping.File)" -ForegroundColor Yellow

  if (Test-Path $zipPath) {
    # Clean the output directory first to prevent duplicate accumulation
    if (Test-Path $outputDir) {
      Remove-Item -Path $outputDir -Recurse -Force
    }
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
    
    Expand-Archive -Path $zipPath -DestinationPath $outputDir -Force
    Write-Host "  [OK] Extracted to: $outputDir" -ForegroundColor Green
    
    $imageExts = @('.jpg', '.jpeg', '.png', '.webp')
    $files = Get-ChildItem -Path $outputDir -Recurse -File | Where-Object { $imageExts -contains $_.Extension.ToLower() } | Sort-Object Name
    
    foreach ($file in $files) {
      if ($file.DirectoryName -ne $outputDir) {
        Move-Item -Path $file.FullName -Destination $outputDir -Force -ErrorAction SilentlyContinue
      }
    }
    
    # Clean up any leftover subdirectories from the zip
    Get-ChildItem -Path $outputDir -Directory | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    
    $files = Get-ChildItem -Path $outputDir -File | Where-Object { $imageExts -contains $_.Extension.ToLower() } | Sort-Object Name
    
    $counter = 1
    foreach ($file in $files) {
      $newName = "{0:D4}.jpg" -f $counter
      $newPath = Join-Path $outputDir $newName
      if ($file.FullName -ne $newPath) {
        Rename-Item -Path $file.FullName -NewName $newName -Force -ErrorAction SilentlyContinue
      }
      $counter++
    }
    
    $total = $files.Count
    Write-Host "  [+] Renamed $total frames sequentially" -ForegroundColor Green
    Write-Host ""
  } else {
    Write-Host "  [!] ZIP not found: $zipPath" -ForegroundColor Red
    Write-Host "  Creating directory for manual frame placement..." -ForegroundColor Gray
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
    Write-Host ""
  }
}

Write-Host "[*] Frame extraction complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frames are located at:" -ForegroundColor White
Write-Host "  $PublicFrames\hologram\0001.jpg ... (hologram frames)" -ForegroundColor Gray
Write-Host "  $PublicFrames\shrink\0001.jpg   ... (shrink frames)" -ForegroundColor Gray  
Write-Host "  $PublicFrames\dome\0001.jpg     ... (dome frames)" -ForegroundColor Gray
Write-Host ""
Write-Host "Now run: npm run dev" -ForegroundColor Cyan
