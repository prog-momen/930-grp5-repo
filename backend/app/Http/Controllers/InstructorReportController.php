<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Supabase\SupabaseClient; // Assuming Supabase client is available

class InstructorReportController extends Controller
{
    protected $supabase;

    public function __construct()
    {
        // Initialize Supabase client. Adjust this based on actual Supabase setup in Laravel.
        // This is a placeholder and might need adjustment based on how Supabase is injected/configured.
        $this->supabase = new SupabaseClient(
            config('services.supabase.url'),
            config('services.supabase.key')
        );
    }

    public function submitReport(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            // Insert data into Supabase table
            $response = $this->supabase->from('instructor_reports') // Assuming 'instructor_reports' table
                                       ->insert([
                                           'name' => $validatedData['name'],
                                           'email' => $validatedData['email'],
                                           'message' => $validatedData['message'],
                                           'created_at' => now(), // Add timestamp
                                       ])
                                       ->execute();

            // Check for Supabase errors
            if ($response->hasError()) {
                Log::error('Supabase insertion error: ' . $response->getError()->getMessage());
                return response()->json(['message' => 'Failed to submit report.', 'error' => $response->getError()->getMessage()], 500);
            }

            Log::info('Instructor report submitted successfully: ' . json_encode($validatedData));
            return response()->json(['message' => 'Report submitted successfully!'], 201);

        } catch (\Exception $e) {
            Log::error('Error submitting instructor report: ' . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }
}
