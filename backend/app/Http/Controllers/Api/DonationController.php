<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    /**
     * Return all donations as JSON.
     */
    public function index()
    {
        return response()->json(Donation::all());
    }

    /**
     * Create a new donation.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'donor' => 'required|string|max:255',
        'type' => 'required|string|max:255',
        'value' => 'nullable|integer|min:0',
        'date_received' => 'required|date',
        'allocated_to' => 'nullable|string|max:255',
        'status' => 'required|string',
        'recorded_by' => 'nullable|string|max:255',
    ]);

    $validated['donation_code'] = $this->nextDonationCode();

    $donation = Donation::create($validated);

    return response()->json($donation, 201);
}

    /**
     * Update an existing donation (mainly for status changes, e.g. acknowledging receipt).
     */
    public function update(Request $request, Donation $donation)
    {
        $validated = $request->validate([
            'status' => 'sometimes|required|string',
            'allocated_to' => 'nullable|string|max:255',
        ]);

        $donation->update($validated);

        return response()->json($donation);
    }

    /**
     * Generate the next DN-#### code.
     */
    private function nextDonationCode(): string
    {
        $last = Donation::orderByDesc('id')->first();
        $nextNumber = $last ? ((int) substr($last->donation_code, 3)) + 1 : 501;

        return 'DN-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }
}
