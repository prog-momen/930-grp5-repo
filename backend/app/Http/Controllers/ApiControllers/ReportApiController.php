<?php
namespace App\Http\Controllers\ApiControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Report;

class ReportApiController extends Controller
{
    public function index()
    {
        $user = request()->attributes->get('supabase_user');

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (($user->role ?? null) === 'Admin') {
            $reports = Report::orderBy('created_at', 'desc')->paginate(10);
        } else {
            $reports = Report::where('reporter_id', $user->sub)
                             ->orderBy('created_at', 'desc')
                             ->paginate(10);
        }

        return response()->json($reports);
    }

    public function store(Request $request)
    {
        $user = request()->attributes->get('supabase_user');

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $rules = [
            'type' => 'required|in:technical_issue,become_instructor,certificate_request,lesson_issue',
            'message' => 'nullable|string',
        ];

        if ($request->type === 'become_instructor') {
            $rules = array_merge($rules, [
                'full_name' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'email' => 'required|email',
                'whatsapp' => 'nullable|string|max:20',
                'cv_pdf' => 'required|file|mimes:pdf|max:2048',
            ]);
        } elseif ($request->type === 'technical_issue') {
            $rules['course_id'] = 'required|exists:courses,id';
        } elseif ($request->type === 'lesson_issue') {
            $rules['lesson_id'] = 'required|exists:lessons,id';
        }

        $validated = $request->validate($rules);

        $validated['reporter_id'] = $user->sub;

        if ($request->hasFile('cv_pdf')) {
            $path = $request->file('cv_pdf')->store('cvs', 'public');
            $validated['cv_pdf_path'] = $path;
        }

        $report = Report::create($validated);

        return response()->json(['message' => 'Report submitted successfully', 'data' => $report], 201);
    }

    public function show($id)
    {
        $user = request()->attributes->get('supabase_user');

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $report = Report::findOrFail($id);

        if ($user->sub !== $report->reporter_id && ($user->role ?? null) !== 'Admin') {
            return response()->json(['error' => 'Access denied'], 403);
        }

        return response()->json($report);
    }

    public function update(Request $request, $id)
    {
        $user = request()->attributes->get('supabase_user');

        if (($user->role ?? null) !== 'Admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $report = Report::findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,reviewed,resolved',
        ]);

        $report->update([
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Report updated successfully', 'data' => $report]);
    }

    public function destroy($id)
    {
        $user = request()->attributes->get('supabase_user');

        if (($user->role ?? null) !== 'Admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json(['message' => 'Report deleted successfully']);
    }
}
