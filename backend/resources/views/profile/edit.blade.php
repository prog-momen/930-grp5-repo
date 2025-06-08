<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Profile</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light text-dark">

  <header class="py-4 bg-white shadow-sm mb-4">
    <div class="container">
      <h2 class="fw-semibold fs-3 text-dark">Profile</h2>
    </div>
  </header>

  <main class="py-5">
    <div class="container">

      <!-- ✅ Update Profile Information -->
      <div class="mb-5 p-4 bg-white shadow rounded">
        <h3>Update Profile Information</h3>
        <form method="POST" action="{{ route('profile.update') }}">
          @csrf
          @method('PATCH')

          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control @error('name') is-invalid @enderror"
              id="name"
              name="name"
              value="{{ old('name', $user->name) }}"
              required
              autofocus
            />
            @error('name')
              <div class="invalid-feedback">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control @error('email') is-invalid @enderror"
              id="email"
              name="email"
              value="{{ old('email', $user->email) }}"
              required
            />
            @error('email')
              <div class="invalid-feedback">{{ $message }}</div>
            @enderror
          </div>

          <button type="submit" class="btn btn-primary">Update Profile</button>

          @if (session('status') === 'profile-updated')
            <p class="text-success mt-2 small">Saved.</p>
          @endif
        </form>
      </div>

      <!-- ✅ Update Password -->
      <div class="mb-5 p-4 bg-white shadow rounded">
        <h3>Update Password</h3>
        <form method="POST" action="{{ route('password.update') }}">
          @csrf
          @method('PUT')

          <div class="mb-3">
            <label for="current_password" class="form-label">Current Password</label>
            <input
              type="password"
              class="form-control @error('current_password') is-invalid @enderror"
              id="current_password"
              name="current_password"
              required
            />
            @error('current_password')
              <div class="invalid-feedback">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">New Password</label>
            <input
              type="password"
              class="form-control @error('password') is-invalid @enderror"
              id="password"
              name="password"
              required
            />
            @error('password')
              <div class="invalid-feedback">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="password_confirmation" class="form-label">Confirm New Password</label>
            <input
              type="password"
              class="form-control"
              id="password_confirmation"
              name="password_confirmation"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">Update Password</button>

          @if (session('status') === 'password-updated')
            <p class="text-success mt-2 small">Password updated.</p>
          @endif
        </form>
      </div>

      <!-- ✅ Delete Account -->
      <div class="mb-5 p-4 bg-white shadow rounded">
        <h3>Delete Account</h3>
        <form method="POST" action="{{ route('profile.destroy') }}" onsubmit="return confirm('Are you sure you want to delete your account? This action cannot be undone.')">
          @csrf
          @method('DELETE')

          <p class="text-danger">Warning: This action is irreversible. Please confirm your password to delete your account.</p>

          <div class="mb-3">
            <label for="password_delete" class="form-label">Password</label>
            <input
              type="password"
              class="form-control @error('password') is-invalid @enderror"
              id="password_delete"
              name="password"
              required
            />
            @error('password')
              <div class="invalid-feedback">{{ $message }}</div>
            @enderror
          </div>

          <button type="submit" class="btn btn-danger">Delete Account</button>

          @if (session('status') === 'account-deleted')
            <p class="text-success mt-2 small">Account deleted.</p>
          @endif
        </form>
      </div>

    </div>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
