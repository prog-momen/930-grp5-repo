<section>
    <header class="mb-4">
        <h2 class="h5 text-dark">
            {{ __('Update Password') }}
        </h2>
        <p class="text-muted">
            {{ __('Ensure your account is using a long, random password to stay secure.') }}
        </p>
    </header>

    <form method="post" action="{{ route('password.update') }}" class="mt-4">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="current_password" class="form-label">{{ __('Current Password') }}</label>
            <input
                type="password"
                id="current_password"
                name="current_password"
                class="form-control @error('current_password') is-invalid @enderror"
                autocomplete="current-password"
            >
            @error('current_password')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">{{ __('New Password') }}</label>
            <input
                type="password"
                id="password"
                name="password"
                class="form-control @error('password') is-invalid @enderror"
                autocomplete="new-password"
            >
            @error('password')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="password_confirmation" class="form-label">{{ __('Confirm Password') }}</label>
            <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                class="form-control @error('password_confirmation') is-invalid @enderror"
                autocomplete="new-password"
            >
            @error('password_confirmation')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="d-flex align-items-center gap-3">
            <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>

            @if (session('status') === 'password-updated')
                <p id="saved-msg" class="text-success mb-0 small">{{ __('Saved.') }}</p>
                <script>
                    setTimeout(() => {
                        const msg = document.getElementById('saved-msg');
                        if(msg) msg.style.display = 'none';
                    }, 2000);
                </script>
            @endif
        </div>
    </form>
</section>
