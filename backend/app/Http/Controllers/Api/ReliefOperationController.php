<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ReliefOperation;
use Illuminate\Http\Request;

class ReliefOperationController extends Controller
{
    /**
     * Return all relief operations as JSON.
     */
    public function index()
    {
        return response()->json(ReliefOperation::all());
    }

    /**
     * Create a new relief operation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'event' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'date' => 'required|date',
            'barangay' => 'required|string|max:255',
            'beneficiaries' => 'required|integer|min:0',
            'beneficiary_unit' => 'nullable|string|max:255',
            'items_distributed' => 'required|integer|min:0',
            'item_unit' => 'nullable|string|max:255',
            'status' => 'required|string',
            'logged_by' => 'nullable|string|max:255',
        ]);

        $validated['operation_code'] = $this->nextOperationCode();

        $operation = ReliefOperation::create($validated);

        return response()->json($operation, 201);
    }

    /**
     * Update an existing relief operation.
     */
    public function update(Request $request, ReliefOperation $reliefOperation)
    {
        $validated = $request->validate([
            'event' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'date' => 'sometimes|required|date',
            'barangay' => 'sometimes|required|string|max:255',
            'beneficiaries' => 'sometimes|required|integer|min:0',
            'beneficiary_unit' => 'nullable|string|max:255',
            'items_distributed' => 'sometimes|required|integer|min:0',
            'item_unit' => 'nullable|string|max:255',
            'status' => 'sometimes|required|string',
        ]);

        $reliefOperation->update($validated);

        return response()->json($reliefOperation);
    }

    /**
     * Generate the next RO-#### code.
     */
    private function nextOperationCode(): string
    {
        $last = ReliefOperation::orderByDesc('id')->first();
        $nextNumber = $last ? ((int) substr($last->operation_code, 3)) + 1 : 231;

        return 'RO-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }
}