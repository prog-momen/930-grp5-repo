<section>
    <header class="mb-4">
        <h2 class="h5 text-dark">
            {{ __('Profile Information') }}
        </h2>
        <p class="text-muted">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <!-- form لإعادة إرسال رابط التحقق -->
    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-4">
        @csrf
        @method('PATCH')

        <div class="mb-3">
    <label class="form-label">{{ __('Current Name') }}: <strong>{{ $user->name }}</strong></label>
    <label for="name" class="form-label">{{ __('Name') }}</label>
    <input
        type="text"
        id="name"
        name="name"
        class="form-control @error('name') is-invalid @enderror"
        value="{{ old('name', $user->name) }}"
        required
        autofocus
        autocomplete="name"
    >
    @error('name')
        <div class="invalid-feedback">{{ $message }}</div>
    @enderror
</div>

<div class="mb-3">
    <label class="form-label">{{ __('Current Email') }}: <strong>{{ $user->email }}</strong></label>
    <label for="email" class="form-label">{{ __('Email') }}</label>
    <input
        type="email"
        id="email"
        name="email"
        class="form-control @error('email') is-invalid @enderror"
        value="{{ old('email', $user->email) }}"
        required
        autocomplete="username"
    >
    @error('email')
        <div class="invalid-feedback">{{ $message }}</div>
    @enderror

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                <div class="mt-2">
                    <p class="text-danger small">
                        {{ __('Your email address is unverified.') }}
                        <button
                            form="send-verification"
                            type="submit"
                            class="btn btn-link p-0 align-baseline"
                        >
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="small text-success mt-1">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <div class="d-flex align-items-center gap-3">
            <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>

            @if (session('status') === 'profile-updated')
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
