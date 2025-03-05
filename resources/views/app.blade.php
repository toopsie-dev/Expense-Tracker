<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <title>Expense Tracker</title>
    <style>
        * {
            font-family: 'Exo 2', sans-serif;
        }
    </style>
    @vite('resources/css/app.css')
</head>
<body>
    <div id="root"></div>
    @vite('resources/js/app.ts')
</body>
<script>
    window.env = {
        API_BASE_URL: "{{ env('API_BASE_URL') }}",
    }
</script>
</html>