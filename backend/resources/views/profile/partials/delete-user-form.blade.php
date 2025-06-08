<section class="mb-5">
    <header>
        <h2 class="h5 text-dark">
            {{ __('Delete Account') }}
        </h2>
        <p class="text-muted small mt-2">
            {{ __('Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.') }}
        </p>
    </header>

    <!-- زر فتح المودال -->
    <button type="button" class="btn btn-danger mt-3" data-bs-toggle="modal" data-bs-target="#confirmUserDeletionModal">
        {{ __('Delete Account') }}
    </button>

    <!-- مودال التأكيد -->
    <div class="modal fade" id="confirmUserDeletionModal" tabindex="-1" aria-labelledby="confirmUserDeletionLabel" aria-hidden="true">
      <div class="modal-dialog">
        <form method="post" action="{{ route('profile.destroy') }}" class="modal-content p-4">
            @csrf
            @method('DELETE')

            <div class="modal-header">
              <h5 class="modal-title" id="confirmUserDeletionLabel">
                {{ __('Are you sure you want to delete your account?') }}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <p class="small text-muted">
                {{ __('Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.') }}
              </p>

              <div class="mb-3">
                <label for="password" class="form-label visually-hidden">{{ __('Password') }}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control @error('password') is-invalid @enderror"
                  placeholder="{{ __('Password') }}"
                  required
                >
                @error('password')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                {{ __('Cancel') }}
              </button>
              <button type="submit" class="btn btn-danger">
                {{ __('Delete Account') }}
              </button>
            </div>
        </form>
      </div>
    </div>
</section>
