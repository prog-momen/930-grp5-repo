<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dashboard</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="{{ url('/') }}">My Platform</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav align-items-center">
        <li class="nav-item">
          <a class="nav-link active" href="{{ route('dashboard') }}">Dashboard</a>
        </li>
        <li class="nav-item">
          <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button class="btn btn-sm btn-outline-light ms-3" type="submit">Logout</button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container py-5">
    <h1 class="mb-4">Dashboard</h1>

    <div class="card shadow-sm">
        <div class="card-body">
            <p class="lead">You are logged in!</p>
            <p><strong>Role:</strong> {{ auth()->user()->role }}</p>

            <div class="mt-4 d-grid gap-3">
                <a href="{{ route('profile.edit') }}" class="btn btn-primary btn-lg">
                    Edit Your Profile
                </a>

                @if(in_array(auth()->user()->role, ['Student', 'Admin']))
                    <a href="{{ route('courses.enrolled') }}" class="btn btn-secondary btn-lg">
                        My Enrolled Courses
                    </a>
                @endif

                <a href="{{ route('wishlist.index') }}" class="btn btn-info btn-lg text-white">
                    My Wishlist
                </a>

                @if(in_array(auth()->user()->role, ['Student', 'Admin']))
                    <a href="{{ route('payments.index') }}" class="btn btn-success btn-lg">
                        My Payments
                    </a>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap JS Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
