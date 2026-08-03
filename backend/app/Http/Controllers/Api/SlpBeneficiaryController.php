<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SlpBeneficiary;
use Illuminate\Http\Request;

class SlpBeneficiaryController extends Controller
{
    /**
     * Return all SLP beneficiaries as JSON.
     */
    public function index()
    {
        return response()->json(SlpBeneficiary::all());
    }

    /**
     * Add a new SLP beneficiary.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'track' => 'required|string|max:255',
            'project' => 'required|string|max:255',
            'capital' => 'required|integer|min:0',
            'enrolled_by' => 'nullable|string|max:255',
        ]);

        $validated['beneficiary_code'] = $this->nextBeneficiaryCode();
        $validated['date_enrolled'] = now()->toDateString();
        $validated['status'] = 'Active';

        $beneficiary = SlpBeneficiary::create($validated);

        return response()->json($beneficiary, 201);
    }

    /**
     * Update an existing SLP beneficiary (mainly for status changes).
     */
    public function update(Request $request, SlpBeneficiary $slpBeneficiary)
    {
        $validated = $request->validate([
            'status' => 'sometimes|required|string|in:Active,Completed,Dropped',
        ]);

        $slpBeneficiary->update($validated);

        return response()->json($slpBeneficiary);
    }

    /**
     * Generate the next SLP-#### code.
     */
private function nextBeneficiaryCode(): string
{
    $last = SlpBeneficiary::orderByDesc('id')->first();
    $nextNumber = $last ? ((int) substr($last->beneficiary_code, 4)) + 1 : 1;

    return 'SLP-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
}
}
