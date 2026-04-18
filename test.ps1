$headers = @{"Content-Type"="application/json"}
$bodyUser1 = @{"name"="Alice";"email"="alice@example.com";"age"=25} | ConvertTo-Json
$bodyUser2 = @{"name"="Bob";"email"="bob@example.com";"age"=30} | ConvertTo-Json

# POST /users
Write-Output "--- POST User 1 ---"
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method Post -Headers $headers -Body $bodyUser1 | ConvertTo-Json
Write-Output "--- POST User 2 ---"
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method Post -Headers $headers -Body $bodyUser2 | ConvertTo-Json

# GET /users
Write-Output "--- GET ALL Users ---"
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method Get | ConvertTo-Json

# PUT /users/:id
Write-Output "--- PUT User 1 ---"
$bodyUser1Update = @{"name"="Alice";"email"="alice123@example.com";"age"=26} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method Put -Headers $headers -Body $bodyUser1Update | ConvertTo-Json

# GET /users/1
Write-Output "--- GET User 1 ---"
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method Get | ConvertTo-Json

# DELETE /users/2
Write-Output "--- DELETE User 2 ---"
Invoke-RestMethod -Uri "http://localhost:3000/users/2" -Method Delete | ConvertTo-Json

# GET /users
Write-Output "--- GET ALL Users ---"
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method Get | ConvertTo-Json
