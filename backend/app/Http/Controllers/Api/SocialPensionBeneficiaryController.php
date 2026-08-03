<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SocialPensionBeneficiary;
use Illuminate\Http\Request;

class SocialPensionBeneficiaryController extends Controller
{
    /**
     * Return all social pension beneficiaries as JSON.
     */
    public function index()
    {
        return response()->json(SocialPensionBeneficiary::all());
    }

    /**
     * Register a new beneficiary.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:60',
            'barangay' => 'required|string|max:255',
            'osca_id' => 'required|string|max:255',
            'source' => 'required|string|in:Regional,Local',
            'registered_by' => 'nullable|string|max:255',
        ]);

        $validated['pension_code'] = $this->nextPensionCode();
        $validated['date_registered'] = now()->toDateString();
        $validated['status'] = 'Active';

        $beneficiary = SocialPensionBeneficiary::create($validated);

        return response()->json($beneficiary, 201);
    }

    /**
     * Update an existing beneficiary (status changes, payout tracking).
     */
    public function update(Request $request, SocialPensionBeneficiary $socialPensionBeneficiary)
    {
        $validated = $request->validate([
            'status' => 'sometimes|required|string|in:Active,Deceased,Delisted',
            'last_payout' => 'nullable|date',
        ]);

        $socialPensionBeneficiary->update($validated);

        return response()->json($socialPensionBeneficiary);
    }

    /**
     * Generate the next SP-#### code.
     */
    private function nextPensionCode(): string
    {
        $last = SocialPensionBeneficiary::orderByDesc('id')->first();
        $nextNumber = $last ? ((int) substr($last->pension_code, 3)) + 1 : 1;

        return 'SP-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }
}
