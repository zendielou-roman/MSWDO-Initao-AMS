<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Return all applications, including their client, as JSON.
     */
    public function index()
    {
        $applications = Application::with('client')->get();

        return response()->json($applications);
    }

    /**
     * Create a new application.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'type' => 'nullable|string|max:255',
            'amount' => 'required|integer|min:0',
            'barangay' => 'nullable|string|max:255',
            'status' => 'required|string',

            'income_expenditure' => 'nullable|string',
            'economic_condition' => 'nullable|string',
            'problems_presented' => 'array',
            'problems_presented.*' => 'string',
            'other_problem' => 'nullable|string|max:255',
            'client_categories' => 'array',
            'client_categories.*' => 'string',
            'specific_findings' => 'nullable|string',

            'evaluation_factors' => 'array',
            'evaluation_factors.*' => 'string',
            'eligibility' => 'nullable|string',
            'recommendation' => 'nullable|string',
            'informant_name' => 'nullable|string|max:255',
            'interviewed_by' => 'nullable|string|max:255',
            'submitted_by' => 'nullable|string|max:255',
        ]);

        $validated['application_code'] = $this->nextApplicationCode();
        $validated['date_submitted'] = now()->toDateString();

        $application = Application::create($validated);

        return response()->json($application->load('client'), 201);
    }

    /**
     * Update an existing application (mainly for status changes, e.g. OIC approval).
     */
    public function update(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => 'sometimes|required|string',
            'eligibility' => 'sometimes|required|string',
            'recommendation' => 'nullable|string',
        ]);

        $application->update($validated);

        return response()->json($application->load('client'));
    }

    /**
     * Delete an application.
     */
    public function destroy(Application $application)
    {
        $application->delete();

        return response()->json(['message' => 'Application deleted successfully.']);
    }

    /**
     * Generate the next APP-2025### code.
     */
    private function nextApplicationCode(): string
    {
        $last = Application::orderByDesc('id')->first();
        $nextNumber = $last ? ((int) substr($last->application_code, 8)) + 1 : 1;

        return 'APP-2025' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }
}