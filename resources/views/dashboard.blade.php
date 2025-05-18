<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">

                    <p>{{ __("You're logged in!") }}</p>
                    <p><strong>Role:</strong> {{ auth()->user()->role }}</p>

                    <div class="mt-6 space-y-4">

                        <!-- كل المستخدمين ممكن يعدلوا البروفايل -->
                        <a href="{{ route('profile.edit') }}" class="text-indigo-600 hover:underline block">
                            {{ __('Edit Your Profile') }}
                        </a>

                        @if(auth()->user()->role === 'student' || auth()->user()->role === 'admin')
                            <a href="{{ route('courses.enrolled') }}" class="text-indigo-600 hover:underline block">
                                {{ __('My Enrolled Courses') }}
                            </a>
                        @endif

                        <!-- الويشليست لكل المستخدمين -->
                        <a href="{{ route('wishlist.index') }}" class="text-indigo-600 hover:underline block">
                            {{ __('My Wishlist') }}
                        </a>

                        @if(auth()->user()->role === 'student' || auth()->user()->role === 'admin')
                            <a href="{{ route('payments.index') }}" class="text-indigo-600 hover:underline block">
                                {{ __('My Payments') }}
                            </a>
                        @endif

                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
