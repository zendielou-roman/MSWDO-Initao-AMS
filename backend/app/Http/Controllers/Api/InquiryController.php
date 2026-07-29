<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * Return all inquiries as JSON.
     * Public "Send us a message" submissions land here for staff to review.
     */
    public function index()
    {
        $inquiries = Inquiry::latest()->get();

        return response()->json($inquiries);
    }

    /**
     * Create a new inquiry. Public endpoint — no auth required.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'nullable|string|max:255|required_if:is_anonymous,false',
            'is_anonymous' => 'boolean',
            'barangay' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'mobile_number' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if (empty($validated['email']) && empty($validated['mobile_number'])) {
            return response()->json([
                'message' => 'Provide at least an email or a mobile number so we can respond.',
            ], 422);
        }

        if (!empty($validated['is_anonymous'])) {
            $validated['full_name'] = null;
        }

        $validated['status'] = 'new';

        $inquiry = Inquiry::create($validated);

        return response()->json($inquiry, 201);
    }

    /**
     * Update an existing inquiry (status change, staff assignment).
     */
    public function update(Request $request, Inquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'sometimes|required|string|in:new,in_progress,resolved',
            'assigned_to' => 'sometimes|nullable|string|max:255',
        ]);

        $inquiry->update($validated);

        return response()->json($inquiry);
    }

    /**
     * Delete an inquiry.
     */
    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();

        return response()->json(['message' => 'Inquiry deleted successfully.']);
    }
}