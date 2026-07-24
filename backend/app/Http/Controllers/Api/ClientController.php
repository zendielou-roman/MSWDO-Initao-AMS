<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Return all clients, including their family members, as JSON.
     */
    public function index()
    {
        $clients = Client::with('familyMembers')->get();

        return response()->json($clients);
    }

    /**
     * Create a new client (and their family members, if any).
     */
public function store(Request $request)
{
    $validated = $request->validate([
        'surname' => 'required|string|max:255',
        'first_name' => 'required|string|max:255',
        'middle_name' => 'nullable|string|max:255',
        'ext' => 'nullable|string|max:255',
        'age' => 'required|integer|min:0',
        'sex' => 'required|string',
        'purok' => 'nullable|string|max:255',
        'barangay' => 'required|string',
        'religion' => 'nullable|string|max:255',
        'civil_status' => 'nullable|string|max:255',
        'highest_education' => 'nullable|string|max:255',
        'date_of_birth' => 'nullable|date',
        'place_of_birth' => 'nullable|string|max:255',
        'occupation' => 'nullable|string|max:255',
        'monthly_income' => 'nullable|integer|min:0',
        'relationship_to_beneficiary' => 'nullable|string|max:255',
        'pantawid' => 'boolean',
        'philhealth' => 'boolean',
        'contact' => 'required|string',
        'same_as_client' => 'required|boolean',

        'beneficiary_surname' => 'nullable|string|max:255',
        'beneficiary_first_name' => 'nullable|string|max:255',
        'beneficiary_middle_name' => 'nullable|string|max:255',
        'beneficiary_ext' => 'nullable|string|max:255',
        'beneficiary_age' => 'nullable|integer|min:0',
        'beneficiary_sex' => 'nullable|string',
        'beneficiary_purok' => 'nullable|string|max:255',
        'beneficiary_barangay' => 'nullable|string|max:255',
        'beneficiary_religion' => 'nullable|string|max:255',
        'beneficiary_civil_status' => 'nullable|string|max:255',
        'beneficiary_highest_education' => 'nullable|string|max:255',
        'beneficiary_date_of_birth' => 'nullable|date',
        'beneficiary_place_of_birth' => 'nullable|string|max:255',
        'beneficiary_occupation' => 'nullable|string|max:255',
        'beneficiary_monthly_income' => 'nullable|integer|min:0',

        'other_income_source' => 'nullable|string|max:255',
        'other_income_amount' => 'nullable|integer|min:0',
        'total_monthly_income' => 'nullable|integer|min:0',
        'household_condition' => 'array',
        'household_condition.*' => 'string',
        'food' => 'nullable|integer|min:0',
        'education_exp' => 'nullable|integer|min:0',
        'rent' => 'nullable|integer|min:0',
        'transportation' => 'nullable|integer|min:0',
        'recreation' => 'nullable|integer|min:0',
        'medical' => 'nullable|integer|min:0',
        'others_exp' => 'nullable|integer|min:0',

        'categories' => 'array',
        'categories.*' => 'string',

        'family_members' => 'array',
        'family_members.*.name' => 'required|string|max:255',
        'family_members.*.age' => 'nullable|integer|min:0',
    ]);

    $validated['client_code'] = $this->nextClientCode();
    $validated['date_registered'] = now()->toDateString();
    $validated['status'] = 'Active';

    $familyMembers = $validated['family_members'] ?? [];
    unset($validated['family_members']);

    $client = Client::create($validated);

    foreach ($familyMembers as $member) {
        $client->familyMembers()->create($member);
    }

    return response()->json($client->load('familyMembers'), 201);
}

    /**
     * Update an existing client.
     */
public function update(Request $request, Client $client)
{
    $validated = $request->validate([
        'surname' => 'sometimes|required|string|max:255',
        'first_name' => 'sometimes|required|string|max:255',
        'middle_name' => 'nullable|string|max:255',
        'ext' => 'nullable|string|max:255',
        'age' => 'sometimes|required|integer|min:0',
        'sex' => 'sometimes|required|string',
        'purok' => 'nullable|string|max:255',
        'barangay' => 'sometimes|required|string',
        'religion' => 'nullable|string|max:255',
        'civil_status' => 'nullable|string|max:255',
        'highest_education' => 'nullable|string|max:255',
        'date_of_birth' => 'nullable|date',
        'place_of_birth' => 'nullable|string|max:255',
        'occupation' => 'nullable|string|max:255',
        'monthly_income' => 'nullable|integer|min:0',
        'relationship_to_beneficiary' => 'nullable|string|max:255',
        'pantawid' => 'boolean',
        'philhealth' => 'boolean',
        'contact' => 'sometimes|required|string',
        'same_as_client' => 'sometimes|required|boolean',
        'status' => 'sometimes|required|string',

        'beneficiary_surname' => 'nullable|string|max:255',
        'beneficiary_first_name' => 'nullable|string|max:255',
        'beneficiary_middle_name' => 'nullable|string|max:255',
        'beneficiary_ext' => 'nullable|string|max:255',
        'beneficiary_age' => 'nullable|integer|min:0',
        'beneficiary_sex' => 'nullable|string',
        'beneficiary_purok' => 'nullable|string|max:255',
        'beneficiary_barangay' => 'nullable|string|max:255',
        'beneficiary_religion' => 'nullable|string|max:255',
        'beneficiary_civil_status' => 'nullable|string|max:255',
        'beneficiary_highest_education' => 'nullable|string|max:255',
        'beneficiary_date_of_birth' => 'nullable|date',
        'beneficiary_place_of_birth' => 'nullable|string|max:255',
        'beneficiary_occupation' => 'nullable|string|max:255',
        'beneficiary_monthly_income' => 'nullable|integer|min:0',

        'other_income_source' => 'nullable|string|max:255',
        'other_income_amount' => 'nullable|integer|min:0',
        'total_monthly_income' => 'nullable|integer|min:0',
        'household_condition' => 'array',
        'household_condition.*' => 'string',
        'food' => 'nullable|integer|min:0',
        'education_exp' => 'nullable|integer|min:0',
        'rent' => 'nullable|integer|min:0',
        'transportation' => 'nullable|integer|min:0',
        'recreation' => 'nullable|integer|min:0',
        'medical' => 'nullable|integer|min:0',
        'others_exp' => 'nullable|integer|min:0',

        'categories' => 'array',
        'categories.*' => 'string',

        'family_members' => 'array',
        'family_members.*.id' => 'nullable|integer',
        'family_members.*.name' => 'required|string|max:255',
        'family_members.*.age' => 'nullable|integer|min:0',
    ]);

    $familyMembers = $validated['family_members'] ?? null;
    unset($validated['family_members']);

    $client->update($validated);

    if ($familyMembers !== null) {
        $client->familyMembers()->delete();
        foreach ($familyMembers as $member) {
            unset($member['id']);
            $client->familyMembers()->create($member);
        }
    }

    return response()->json($client->load('familyMembers'));
}

    /**
     * Delete a client (their family members are removed automatically).
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json(['message' => 'Client deleted successfully.']);
    }

    /**
     * Generate the next CB-#### code.
     */
    private function nextClientCode(): string
    {
        $last = Client::orderByDesc('id')->first();
        $nextNumber = $last ? ((int) substr($last->client_code, 3)) + 1 : 1000;

        return 'CB-' . $nextNumber;
    }
}
