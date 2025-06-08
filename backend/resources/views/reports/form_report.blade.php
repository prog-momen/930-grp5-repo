@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-start">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    {{ $titleForm ?? 'Submit Report' }}
                </div>
                <div class="card-body">

                    @if(isset($editStatusOnly) && $editStatusOnly)
                        <!-- نموذج تعديل حالة التقرير فقط -->
                        <form action="{{ is_array($route) ? route($route[0], $route[1]) : route($route) }}" method="POST">
                            @csrf
                            @if(in_array(strtolower($method ?? 'post'), ['put', 'patch']))
                                @method($method)
                            @endif

                            <div class="form-group mb-3">
                                <label for="status">Status</label>
                                <select name="status" id="status" class="form-control" required>
                                    @foreach ($statuses as $key => $value)
                                        <option value="{{ $key }}" {{ (old('status', $report->status ?? '') == $key) ? 'selected' : '' }}>
                                            {{ $value }}
                                        </option>
                                    @endforeach
                                </select>
                                <span class="text-danger">{{ $errors->first('status') }}</span>
                            </div>

                            <button type="submit" class="btn btn-primary">{{ $submitButton ?? 'Update Status' }}</button>
                        </form>
                    @else
                        <!-- نموذج التقرير الكامل -->
                        <form action="{{ is_array($route) ? route($route[0], $route[1]) : route($route) }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            @if(in_array(strtolower($method ?? 'post'), ['put', 'patch']))
                                @method($method)
                            @endif

                            <!-- reporter_id مخفي -->
                            <input type="hidden" name="reporter_id" value="{{ auth()->id() }}">

                            <div class="form-group mb-3">
                                <label for="reporter_id_display">Reporter ID</label>
                                <input type="text" id="reporter_id_display" class="form-control" value="{{ auth()->id() }}" readonly>
                            </div>

                            <div class="form-group mb-3">
                                <label for="type">Type</label>
                                <select name="type" id="type" class="form-control" required>
                                    <option value="" disabled {{ old('type', $report->type ?? '') == '' ? 'selected' : '' }}>Select type</option>
                                    <option value="technical_issue" {{ old('type', $report->type ?? '') == 'technical_issue' ? 'selected' : '' }}>Technical Issue</option>
                                    <option value="become_instructor" {{ old('type', $report->type ?? '') == 'become_instructor' ? 'selected' : '' }}>Become Instructor</option>
                                    <option value="certificate_request" {{ old('type', $report->type ?? '') == 'certificate_request' ? 'selected' : '' }}>Certificate Request</option>
                                    <option value="lesson_issue" {{ old('type', $report->type ?? '') == 'lesson_issue' ? 'selected' : '' }}>Lesson Issue</option>
                                </select>
                                <span class="text-danger">{{ $errors->first('type') }}</span>
                            </div>

                            <!-- حقول Technical Issue -->
                            <div id="technical_issue_fields" style="display:none;">
                                <div class="form-group mb-3">
                                    <label for="course_id">Course ID</label>
                                    <input type="text" name="course_id" id="course_id" class="form-control" value="{{ old('course_id', $report->course_id ?? '') }}">
                                    <span class="text-danger">{{ $errors->first('course_id') }}</span>
                                </div>
                            </div>

                            <!-- حقول Lesson Issue -->
                            <div id="lesson_issue_fields" style="display:none;">
                                <div class="form-group mb-3">
                                    <label for="lesson_id">Lesson ID</label>
                                    <input type="text" name="lesson_id" id="lesson_id" class="form-control" value="{{ old('lesson_id', $report->lesson_id ?? '') }}">
                                    <span class="text-danger">{{ $errors->first('lesson_id') }}</span>
                                </div>
                            </div>

                            <!-- حقول Become Instructor -->
                            <div id="become_instructor_fields" style="display:none;">
                                <div class="form-group mb-3">
                                    <label for="full_name">Full Name</label>
                                    <input type="text" name="full_name" id="full_name" class="form-control" value="{{ old('full_name') }}">
                                    <span class="text-danger">{{ $errors->first('full_name') }}</span>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="phone">Phone Number</label>
                                    <input type="tel" name="phone" id="phone" class="form-control" value="{{ old('phone') }}">
                                    <span class="text-danger">{{ $errors->first('phone') }}</span>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="email">Official Email</label>
                                    <input type="email" name="email" id="email" class="form-control" value="{{ old('email') }}">
                                    <span class="text-danger">{{ $errors->first('email') }}</span>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="whatsapp">WhatsApp Number</label>
                                    <input type="tel" name="whatsapp" id="whatsapp" class="form-control" value="{{ old('whatsapp') }}">
                                    <span class="text-danger">{{ $errors->first('whatsapp') }}</span>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="cv_pdf">Upload CV (PDF only)</label>
                                    <input type="file" name="cv_pdf" id="cv_pdf" accept="application/pdf" class="form-control">
                                    <span class="text-danger">{{ $errors->first('cv_pdf') }}</span>
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="message">Message</label>
                                <textarea name="message" id="message" class="form-control" rows="4">{{ old('message', $report->message ?? '') }}</textarea>
                                <span class="text-danger">{{ $errors->first('message') }}</span>
                            </div>

                            <button type="submit" class="btn btn-primary">{{ $submitButton ?? 'Submit' }}</button>
                        </form>

                        <script>
                            function toggleFields() {
                                const type = document.getElementById('type').value;

                                document.getElementById('technical_issue_fields').style.display = 'none';
                                document.getElementById('lesson_issue_fields').style.display = 'none';
                                document.getElementById('become_instructor_fields').style.display = 'none';

                                if(type === 'technical_issue') {
                                    document.getElementById('technical_issue_fields').style.display = 'block';
                                } else if(type === 'lesson_issue') {
                                    document.getElementById('lesson_issue_fields').style.display = 'block';
                                } else if(type === 'become_instructor') {
                                    document.getElementById('become_instructor_fields').style.display = 'block';
                                }
                            }

                            document.addEventListener('DOMContentLoaded', () => {
                                toggleFields();
                                document.getElementById('type').addEventListener('change', toggleFields);
                            });
                        </script>
                    @endif

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
