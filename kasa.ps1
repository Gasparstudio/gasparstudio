Add-Type -AssemblyName System.Drawing
$path = (Resolve-Path "public\Sarkany_volgy_mese_fesztival_logo\PNG\sarkany_volgy__color_icon.png").Path
$bmp = New-Object System.Drawing.Bitmap($path)
$w=$bmp.Width;$h=$bmp.Height
$rect=New-Object System.Drawing.Rectangle(0,0,$w,$h)
$d=$bmp.LockBits($rect,[System.Drawing.Imaging.ImageLockMode]::ReadOnly,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$st=$d.Stride;$by=New-Object byte[] ($st*$h)
[System.Runtime.InteropServices.Marshal]::Copy($d.Scan0,$by,0,$by.Length);$bmp.UnlockBits($d);$bmp.Dispose()
function A([int]$x,[int]$y){ if($x -lt 0 -or $y -lt 0 -or $x -ge $w -or $y -ge $h){return 0}; return $by[$y*$st+$x*4+3] }
# regions: name x0 x1 y0 y1
$regions = @(
 @('headDome',1335,1500,338,415),
 @('neck',300,520,770,930),
 @('jawLower',660,905,650,720),
 @('bellyTop',1180,1430,1090,1180),
 @('upperBodyTopL',300,520,742,800),
 @('lowerCurlLeftInner',640,840,1300,1440)
)
foreach($r in $regions){
 $nm=$r[0];$x0=[int]$r[1];$x1=[int]$r[2];$y0=[int]$r[3];$y1=[int]$r[4]
 $px=@();$py=@()
 for($y=$y0;$y -le $y1;$y++){ for($x=$x0;$x -le $x1;$x++){
   if((A $x $y) -gt 128){ if((A ($x+1) $y) -le 128 -or (A ($x-1) $y) -le 128 -or (A $x ($y+1)) -le 128 -or (A $x ($y-1)) -le 128){ $px+=$x;$py+=$y } }
 }}
 $n=$px.Count
 if($n -lt 12){ "$nm : too few boundary px ($n)"; continue }
 $Sx=0;$Sy=0;$Sxx=0;$Syy=0;$Sxy=0;$Sxz=0;$Syz=0;$Sz=0
 for($i=0;$i -lt $n;$i++){ $X=$px[$i];$Y=$py[$i];$z=$X*$X+$Y*$Y;$Sx+=$X;$Sy+=$Y;$Sxx+=$X*$X;$Syy+=$Y*$Y;$Sxy+=$X*$Y;$Sxz+=$X*$z;$Syz+=$Y*$z;$Sz+=$z }
 $M=@(@($Sxx,$Sxy,$Sx),@($Sxy,$Syy,$Sy),@($Sx,$Sy,$n));$B=@($Sxz,$Syz,$Sz)
 for($i=0;$i -lt 3;$i++){ $mr=$i; for($rr=$i+1;$rr -lt 3;$rr++){ if([math]::Abs($M[$rr][$i]) -gt [math]::Abs($M[$mr][$i])){$mr=$rr} }
   if($mr -ne $i){ $tmp=$M[$i];$M[$i]=$M[$mr];$M[$mr]=$tmp; $tb=$B[$i];$B[$i]=$B[$mr];$B[$mr]=$tb }
   for($rr=0;$rr -lt 3;$rr++){ if($rr -eq $i){continue}; $f=$M[$rr][$i]/$M[$i][$i]; for($cc=0;$cc -lt 3;$cc++){ $M[$rr][$cc]-=$f*$M[$i][$cc] }; $B[$rr]-=$f*$B[$i] } }
 $a=$B[0]/$M[0][0];$bb=$B[1]/$M[1][1];$c=$B[2]/$M[2][2]
 $cx=$a/2;$cy=$bb/2;$rad=[math]::Sqrt($c+$cx*$cx+$cy*$cy)
 $err=0; for($i=0;$i -lt $n;$i++){ $err+=[math]::Abs([math]::Sqrt(($px[$i]-$cx)*($px[$i]-$cx)+($py[$i]-$cy)*($py[$i]-$cy))-$rad) }
 $err=$err/$n
 "{0,-12} cx={1:N1} cy={2:N1} r={3:N1} err={4:N2} n={5}" -f $nm,$cx,$cy,$rad,$err,$n
}