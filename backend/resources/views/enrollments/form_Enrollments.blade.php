@extends('layouts.app')
@vite(['resources/js/app.js'])

@section('content')
<div class="container">
    <div class="row justify-content-start">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    {{ $titleForm }}
                </div> 
                <div class="card-body">

                    {!! Form::model($Enrollments, ['route' => $route, 'method' => $method]) !!}
                    @csrf

                    <div class="form-group">
                        <label for="name">Name</label>
                        {!! Form::text('name', null, ['class'=>'form-control']) !!}
                        <span class="text-helper text-danger">{{ $errors->first('name') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="Enrollments_date">Enrollments Date</label> 
                        {!! Form::date('Enrollments_date', null, ['class'=>'form-control']) !!} 
                        <span class="text-helper text-danger">{{ $errors->first('Enrollments_date') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="Enrollments_topic">Enrollments Topic</label>
                        {!! Form::text('Enrollments_topic', null, ['class'=>'form-control']) !!}
                        <span class="text-helper text-danger">{{ $errors->first('Enrollments_topic') }}</span>
                    </div>

                    <div class="form-group">
                        {!! Form::submit($submitButton, ['class'=>'btn btn-primary']) !!}
                        {!! Form::close() !!}
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
