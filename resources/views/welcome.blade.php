<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Welcome | My Laravel App</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex flex-column min-vh-100">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#">Learnify</a>
            <div class="d-flex">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ url('/dashboard') }}" class="btn btn-outline-primary me-2">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="btn btn-primary me-2">Log in</a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="btn btn-outline-secondary">Register</a>
                        @endif
                    @endauth
                @endif
            </div>
        </div>
    </nav>

    <!-- Landing Content -->
    <main class="flex-fill d-flex align-items-center justify-content-center text-center">
        <div class="container py-5">
            <h1 class="display-4 fw-bold">Welcome to Learnify </h1>
            <p class="lead text-muted mt-3 mb-4">
              Online Course Platform Made By DHT
            </p>
            @guest
                <a href="{{ route('register') }}" class="btn btn-success btn-lg">Get Started</a>
            @endguest
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white text-center py-3 border-top mt-auto">
        <div class="container">
            <small>&copy; {{ date('Y') }} DHT. All rights reserved.</small>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
