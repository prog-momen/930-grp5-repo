{{-- Course Field --}}
@if(isset($course))
    {{-- الحالة: جاي من زر Pay، ما بخليه يختار --}}
    <div class="mb-3">
        <label class="form-label">Course</label>
        <input type="text" class="form-control" value="{{ $course->title }}" readonly>
        <input type="hidden" name="course_id" value="{{ $course->id }}">
    </div>
@else
    {{-- الحالة: إدخال يدوي (مثلاً أدمن) --}}
    <div class="mb-3">
        <label for="course_id" class="form-label">Course</label>
        <select name="course_id" id="course_id" class="form-control" required>
            @foreach ($courses as $c)
                <option value="{{ $c->id }}" {{ (old('course_id', $payment->course_id ?? '') == $c->id) ? 'selected' : '' }}>
                    {{ $c->title }}
                </option>
            @endforeach
        </select>
    </div>
@endif

{{-- Amount --}}
<div class="mb-3">
    <label for="amount" class="form-label">Amount</label>
    <input type="number" name="amount" id="amount" class="form-control"
           value="{{ old('amount', $payment->amount ?? $course->price ?? '') }}" required>
</div>

{{-- Admin-only fields --}}
@if(isset($payment) && auth()->user()->isAdmin())
    <div class="mb-3">
        <label for="status" class="form-label">Status</label>
        <select name="status" id="status" class="form-control" required>
            <option value="pending" {{ old('status', $payment->status) == 'pending' ? 'selected' : '' }}>Pending</option>
            <option value="completed" {{ old('status', $payment->status) == 'completed' ? 'selected' : '' }}>Completed</option>
            <option value="failed" {{ old('status', $payment->status) == 'failed' ? 'selected' : '' }}>Failed</option>
        </select>
    </div>

    <div class="mb-3">
        <label for="paid_at" class="form-label">Paid At</label>
        <input type="datetime-local" name="paid_at" id="paid_at" class="form-control"
               value="{{ old('paid_at', isset($payment) && $payment->paid_at ? $payment->paid_at->format('Y-m-d\TH:i') : '') }}">
    </div>
@endif
